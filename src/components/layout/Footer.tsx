/* ============================================
   Footer Component
   Site footer with community messaging.
   ============================================ */

import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer} id="site-footer">
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <h3>
              coletiv<span className={styles.brandAccent}>arte</span>
            </h3>
            <p>
              Um coletivo digital de artesãos independentes. Cada peça vendida aqui
              é feita à mão, com alma e intenção. Apoiar o artesanato é apoiar
              histórias, comunidades e a beleza do imperfeito.
            </p>
          </div>

          <div className={styles.column}>
            <h4>Explorar</h4>
            <ul>
              <li><Link href="/">Início</Link></li>
              <li><Link href="/#artisans">Artesãos</Link></li>
              <li><Link href="/#products">Produtos</Link></li>
              <li><Link href="/#community">Manifesto</Link></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4>Artesãos</h4>
            <ul>
              <li><Link href="/artisans/marina-oliveira">Marina Oliveira</Link></li>
              <li><Link href="/artisans/rafael-santos">Rafael Santos</Link></li>
              <li><Link href="/artisans/lucia-tecela">Lúcia Tecelã</Link></li>
              <li><Link href="/artisans/tomaz-vieira">Tomaz Vieira</Link></li>
              <li><Link href="/artisans/sol-pinturas">Sol Pinturas</Link></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4>Para Artesãos</h4>
            <ul>
              <li><Link href="/admin">Painel do Artesão</Link></li>
              <li><Link href="/">Como Vender</Link></li>
              <li><Link href="/">Comunidade</Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <span className={styles.copyright}>
            © {new Date().getFullYear()} Coletivarte. Feito com as mãos e o coração.
          </span>
          <span className={styles.manifesto}>
            &ldquo;A arte é o caminho mais curto entre duas almas.&rdquo;
          </span>
        </div>
      </div>
    </footer>
  );
}
