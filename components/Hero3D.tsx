"use client";

import { Canvas, useFrame, extend } from "@react-three/fiber";
import { shaderMaterial, Plane } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";
// Fixing the namespace issue by just not using the problematic Type for now or letting it infer
// import { ReactThreeFiber } from "@react-three/fiber"; 

// --- GLSL SHADERS ---

const vertexShader = `
  uniform float uTime;
  uniform float uScroll;
  
  varying vec2 vUv;
  varying float vElevation;

  // Classic Perlin 3D Noise 
  // (Source: https://github.com/stegu/webgl-noise/blob/master/src/classicnoise3D.glsl)
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  
  float snoise(vec3 v) {
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    // First corner
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 = v - i + dot(i, C.xxx) ;

    // Other corners
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
    vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

    // Permutations
    i = mod289(i); 
    vec4 p = permute( permute( permute( 
              i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
            + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

    // Gradients: 7x7 points over a square, mapped onto an octahedron.
    // The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)
    float n_ = 0.142857142857; // 1.0/7.0
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
    //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    //Normalise gradients
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    // Mix final noise value
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                  dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vUv = uv;

    // Base oscillation
    float shift = uTime * 0.2;
    
    // Add scroll influence to speed/distortion
    float scrollImpact = uScroll * 2.0; 
    
    // Complex Noise
    float noise1 = snoise(vec3(position.x * 0.5 + shift, position.y * 0.5 + scrollImpact, shift));
    float noise2 = snoise(vec3(position.x * 2.0 - shift, position.y * 2.0 + scrollImpact, shift));

    // Combine noises
    float elevation = noise1 * 0.5 + noise2 * 0.2;
    
    // Pass elevation to fragment
    vElevation = elevation;

    vec3 newPosition = position;
    newPosition.z += elevation * 1.5; // Wave height

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    // Transparent Colors - Lighter, more subtle
    vec3 depthColor = vec3(0.5, 0.5, 0.55); // Mid-grey/blue
    vec3 surfaceColor = vec3(0.9, 0.95, 1.0); // Almost white
    
    // Mix based on elevation
    float mixStrength = (vElevation + 0.2) * 2.0;
    vec3 color = mix(depthColor, surfaceColor, mixStrength);
    
    // Specular highlights remain bright
    float highlight = step(0.4, vElevation);
    color += vec3(1.0) * highlight * 0.5;

    // Use low alpha for transparency
    // Base alpha 0.1, increasing at peaks
    float alpha = 0.1 + (highlight * 0.2); 

    gl_FragColor = vec4(color, alpha);
  }
`;

// Create Shader Material
const WaterMaterial = shaderMaterial(
    {
        uTime: 0,
        uScroll: 0,
    },
    vertexShader,
    fragmentShader
);

// Declare global type for the shader material to make TS happy
extend({ WaterMaterial });

declare global {
    namespace JSX {
        interface IntrinsicElements {
            waterMaterial: any; // Using any to avoid the namespace issues for now
        }
    }
}

function WaterPlane() {
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    useFrame(({ clock }) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
            // Map scroll Y to a normalized value roughly (0 to 1-ish)
            // divide by window height to get "pages scrolled"
            materialRef.current.uniforms.uScroll.value = window.scrollY / window.innerHeight;
        }
    });

    return (
        <Plane args={[15, 15, 128, 128]} rotation={[-Math.PI / 4, 0, 0]}>
            <waterMaterial
                ref={materialRef}
                wireframe={false}
                transparent={true}
            />
        </Plane>
    );
}

export default function Hero3D() {
    return (
        <div className="absolute inset-0 z-0 w-full h-full pointer-events-none bg-transparent">
            <Canvas gl={{ alpha: true, antialias: true }} camera={{ position: [0, 0, 5], fov: 45 }}>
                <WaterPlane />
            </Canvas>
        </div>
    );
}
