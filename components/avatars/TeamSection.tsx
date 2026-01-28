"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { teamMembers } from './teamData';
import AvatarCard from './AvatarCard';
import styles from './TeamSection.module.css';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !cardsRef.current) return;

    const ctx = gsap.context(() => {
      // Set ScrollTrigger defaults for smooth performance
      ScrollTrigger.config({
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
      });

      // Title animation - smooth fade and slide
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: 'power4.out',
      });

      // Cards staggered pop-up animation
      const cards = cardsRef.current?.querySelectorAll('.avatar-card');

      if (cards && cards.length > 0) {
        // Initial state
        gsap.set(cards, {
          opacity: 0,
          y: 80,
          scale: 0.85,
          rotationX: -15,
        });

        // Smooth pop-up animation
        gsap.to(cards, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 75%',
            end: 'top 40%',
            toggleActions: 'play none none reverse',
          },
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          stagger: {
            each: 0.15,
            ease: 'power2.out'
          },
          duration: 1,
          ease: 'back.out(1.2)',
          force3D: true, // GPU acceleration
        });

        // Subtle parallax effect for depth
        cards.forEach((card, i) => {
          gsap.to(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
            y: i % 2 === 0 ? -20 : 20,
            ease: 'none',
          });

          // Smooth hover effects with GSAP
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              scale: 1.05,
              y: -10,
              duration: 0.5,
              ease: 'power2.out',
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              scale: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out',
            });
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.teamSection}>
      <div className={styles.teamContainer}>
        {/* Section Header */}
        <div ref={titleRef} className={styles.teamHeader}>
          <h2 className={styles.teamTitle}>Meet Our Team</h2>
          <p className={styles.teamSubtitle}>
            Four passionate developers building the future
          </p>
        </div>

        {/* Avatar Grid */}
        <div ref={cardsRef} className={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <AvatarCard
              key={member.id}
              member={member}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
