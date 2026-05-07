/* ============================================
   Admin Sidebar Component
   Navigation for the artisan admin area.
   ============================================ */

import React from 'react';
import Link from 'next/link';
import styles from './Sidebar.module.css';

const ADMIN_NAV = [
  {
    section: 'Principal',
    links: [
      { href: '/admin', label: 'Painel', icon: '◉' },
      { href: '/admin', label: 'Produtos', icon: '❋' },
      { href: '/admin', label: 'Pedidos', icon: '☰' },
    ],
  },
  {
    section: 'Gestão',
    links: [
      { href: '/admin', label: 'Clientes', icon: '◎' },
      { href: '/admin', label: 'Relatórios', icon: '▤' },
      { href: '/admin', label: 'Configurações', icon: '⚙' },
    ],
  },
];

export function Sidebar() {
  return (
    <aside className={styles.sidebar} id="admin-sidebar">
      <div className={styles.profile}>
        <div className={styles.avatar}>MO</div>
        <div className={styles.profileInfo}>
          <span className={styles.profileName}>Marina Oliveira</span>
          <span className={styles.profileRole}>Artesã</span>
        </div>
      </div>

      <div className={styles.divider} />

      {ADMIN_NAV.map((section) => (
        <div key={section.section} className={styles.navSection}>
          <div className={styles.sectionLabel}>{section.section}</div>
          {section.links.map((link) => (
            <Link key={link.label} href={link.href} className={styles.navLink}>
              <span className={styles.navIcon}>{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </div>
      ))}

      <div className={styles.spacer} />

      <div className={styles.backLink}>
        <Link href="/">← Voltar à loja</Link>
      </div>
    </aside>
  );
}
