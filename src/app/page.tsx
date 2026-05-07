/* ============================================
   Homepage — Coletivarte
   The soul of the marketplace.
   ============================================ */

import Image from 'next/image';
import Link from 'next/link';
import { ProductCard } from '@/components/ui/ProductCard';
import { ButtonLink } from '@/components/ui/Button';
import { artisans } from '@/data/artisans';
import { products } from '@/data/products';
import styles from './page.module.css';

const bestSellers = products.filter((p) => p.isActive).slice(0, 4);
const newArrivals = [...products]
  .filter((p) => p.isActive)
  .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  .slice(0, 4);

export default function HomePage() {
  return (
    <>
      {/* ===== HERO BANNER ===== */}
      <section className={styles.heroBanner}>
        <div className={styles.heroImageWrapper}>
          <video
            src="/coletivarte.mp4"
            autoPlay
            loop
            muted
            playsInline
            className={styles.heroVideo}
          />
        </div>
      </section>

      {/* ===== INFO BAR ===== */}
      <div className={styles.infoBar}>
        <div className={styles.infoBarInner}>
          <div className={styles.infoItem}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
            <span>PARCELAMENTO EM ATÉ 6X SEM JUROS</span>
          </div>
          <div className={styles.infoItem}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>
            <span>LOJA OFICIAL DO ARTESÃO</span>
          </div>
          <div className={styles.infoItem}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
            <span>ENTREGAMOS PARA TODO O BRASIL</span>
          </div>
        </div>
      </div>

      {/* ===== MAIS VENDIDOS ===== */}
      <section className={styles.productsSection} id="best-sellers">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>MAIS VENDIDOS</h2>
        </div>

        <div className={styles.productsGrid}>
          {bestSellers.map((product) => {
            const artisan = artisans.find((a) => a.id === product.artisanId);
            return (
              <ProductCard
                key={product.id}
                product={product}
                artisanName={artisan?.name}
              />
            );
          })}
        </div>

        <div className={styles.viewAll}>
          <ButtonLink href="/products" variant="secondary">
            Ver todos
          </ButtonLink>
        </div>
      </section>

      {/* ===== LANÇAMENTOS ===== */}
      <section className={styles.productsSection} id="new-arrivals" style={{ backgroundColor: '#f9f9f9' }}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>LANÇAMENTOS</h2>
        </div>

        <div className={styles.productsGrid}>
          {newArrivals.map((product) => {
            const artisan = artisans.find((a) => a.id === product.artisanId);
            return (
              <ProductCard
                key={product.id}
                product={product}
                artisanName={artisan?.name}
              />
            );
          })}
        </div>

        <div className={styles.viewAll}>
          <ButtonLink href="/products?sort=newest" variant="secondary">
            Ver novidades
          </ButtonLink>
        </div>
      </section>



      {/* ===== FEATURED ARTISANS ===== */}
      <section className={styles.artisansSection} id="artisans">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionEyebrow}>Nossos artesãos</span>
          <h2 className={styles.sectionTitle}>Mãos que criam</h2>
          <p className={styles.sectionSubtitle}>
            Conheça as pessoas por trás de cada peça. Artesãos independentes
            que transformam matéria em arte com técnica, paixão e propósito.
          </p>
        </div>

        <div className={styles.artisansGrid}>
          {artisans.map((artisan) => (
            <Link
              key={artisan.id}
              href={`/artisans/${artisan.slug}`}
              className={styles.artisanCard}
              id={`artisan-card-${artisan.slug}`}
            >
              {artisan.avatarUrl ? (
                <div className={styles.artisanAvatar}>
                  <Image
                    src={artisan.avatarUrl}
                    alt={artisan.name}
                    fill
                    sizes="80px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ) : (
                <div className={styles.artisanAvatarFallback}>
                  {artisan.name.charAt(0)}
                </div>
              )}
              <h3 className={styles.artisanName}>{artisan.name}</h3>
              <span className={styles.artisanSpecialty}>
                {artisan.specialty}
              </span>
              <span className={styles.artisanLocation}>
                📍 {artisan.location}
              </span>
            </Link>
          ))}
        </div>
      </section>




      {/* ===== CTA BANNER ===== */}
      <section className={styles.ctaSection} id="cta-sell">
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>
            Você é artesão? Venda no Coletivarte.
          </h2>
          <p className={styles.ctaText}>
            Junte-se à nossa comunidade de criadores independentes. Sem
            intermediários, sem algoritmos — só sua arte e quem a procura.
          </p>
          <ButtonLink href="/admin" variant="warm" size="large">
            Começar a vender
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
