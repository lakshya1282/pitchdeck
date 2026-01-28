"use client";

import { useRef } from 'react';
import { TeamMember } from './teamData';
import AvatarCanvas from './AvatarCanvas';
import styles from './TeamSection.module.css';

interface AvatarCardProps {
    member: TeamMember;
    index: number;
}

export default function AvatarCard({ member, index }: AvatarCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={cardRef}
            className={`avatar-card ${styles.avatarCard}`}
            style={{
                background: `linear-gradient(135deg, ${member.color}15, ${member.accentColor}10)`,
            }}
        >
            {/* 3D Avatar Container */}
            <div className={styles.avatarCanvasWrapper}>
                <AvatarCanvas
                    color={member.color}
                    accentColor={member.accentColor}
                    avatarImage={member.avatarImage}
                />
            </div>

            {/* Info Section */}
            <div className={styles.avatarInfo}>
                <h3 className={styles.avatarName} style={{ color: member.accentColor }}>
                    {member.name}
                </h3>
                <p className={styles.avatarRole}>{member.role}</p>
            </div>

            {/* Decorative elements */}
            <div
                className={styles.avatarAccentLine}
                style={{ background: member.color }}
            />
        </div>
    );
}
