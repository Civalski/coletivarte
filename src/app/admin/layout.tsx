/* ============================================
   Admin Layout
   Wraps admin pages with sidebar navigation.
   ============================================ */

import React from 'react';
import type { Metadata } from 'next';
import { Sidebar } from '@/components/admin/Sidebar';
import styles from './layout.module.css';

export const metadata: Metadata = {
  title: {
    default: 'Painel do Artesão',
    template: '%s | Painel — Coletivarte',
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.adminLayout}>
      <Sidebar />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
