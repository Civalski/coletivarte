/* ============================================
   StatsCard Component
   Dashboard metric card for admin area.
   ============================================ */

import React from 'react';
import styles from './StatsCard.module.css';

export interface StatsCardProps {
  label: string;
  value: string;
  icon: string;
  color?: 'terracotta' | 'sage' | 'ochre' | 'indigo';
  change?: string;
  changeType?: 'positive' | 'negative';
}

export function StatsCard({
  label,
  value,
  icon,
  color = 'terracotta',
  change,
  changeType = 'positive',
}: StatsCardProps) {
  const iconColorClass = {
    terracotta: styles.iconTerracotta,
    sage: styles.iconSage,
    ochre: styles.iconOchre,
    indigo: styles.iconIndigo,
  }[color];

  return (
    <div className={styles.statsCard}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        <div className={`${styles.icon} ${iconColorClass}`}>{icon}</div>
      </div>
      <span className={styles.value}>{value}</span>
      {change && (
        <span
          className={`${styles.change} ${
            changeType === 'positive' ? styles.changePositive : styles.changeNegative
          }`}
        >
          {changeType === 'positive' ? '↑' : '↓'} {change}
        </span>
      )}
    </div>
  );
}
