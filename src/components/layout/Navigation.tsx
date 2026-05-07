/* ============================================
   Navigation Component
   Main site navigation links.
   ============================================ */

import React from 'react';
import Link from 'next/link';
import styles from './Navigation.module.css';

const NAV_LINKS = [
  { href: '/products?category=novidades', label: 'NOVIDADES' },
  { href: '/products?category=colares', label: 'COLARES' },
  { href: '/products?category=pulseiras', label: 'PULSEIRAS' },
  { href: '/products?category=quadros', label: 'QUADROS' },
  { href: '/products?category=aneis', label: 'ANÉIS' },
  { href: '/products?category=brincos', label: 'BRINCOS' },
  { href: '/#artisans', label: 'ARTESÃOS' },
  { href: '/products?promocao=true', label: 'PROMOÇÃO', highlight: true },
];

export function Navigation() {
  return (
    <nav className={styles.nav} id="main-nav" aria-label="Navegação principal">
      {NAV_LINKS.map((link) => (
        <Link 
          key={link.label} 
          href={link.href} 
          className={`${styles.link} ${link.highlight ? styles.highlight : ''}`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
