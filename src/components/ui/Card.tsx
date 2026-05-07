/* ============================================
   Card Component
   Paper-like card with warm shadow and border.
   ============================================ */

import React from 'react';
import styles from './Card.module.css';

export interface CardProps {
  variant?: 'default' | 'paper';
  interactive?: boolean;
  compact?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Card({
  variant = 'default',
  interactive = false,
  compact = false,
  className = '',
  children,
}: CardProps) {
  const classes = [
    styles.card,
    variant === 'paper' ? styles.paper : '',
    interactive ? styles.interactive : '',
    compact ? styles.compact : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classes}>{children}</div>;
}

export function CardBody({
  className = '',
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`${styles.body} ${className}`}>{children}</div>;
}
