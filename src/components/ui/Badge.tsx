/* ============================================
   Badge Component
   Small label for categories, tags, status.
   ============================================ */

import React from 'react';
import styles from './Badge.module.css';

export interface BadgeProps {
  color?: 'default' | 'terracotta' | 'sage' | 'ochre' | 'burgundy' | 'indigo';
  children: React.ReactNode;
  className?: string;
}

export function Badge({
  color = 'default',
  className = '',
  children,
}: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[color]} ${className}`}>
      {children}
    </span>
  );
}
