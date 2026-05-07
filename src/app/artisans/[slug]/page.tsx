/* ============================================
   Artisan Storefront Page
   Individual artisan profile + product listing.
   ============================================ */

import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ProductCard } from '@/components/ui/ProductCard';
import { ButtonLink } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { artisans } from '@/data/artisans';
import { products } from '@/data/products';
import styles from './page.module.css';

interface ArtisanPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: ArtisanPageProps
): Promise<Metadata> {
  const { slug } = await params;
  const artisan = artisans.find((a) => a.slug === slug);
  if (!artisan) return { title: 'Artesão não encontrado' };

  return {
    title: `${artisan.name} — ${artisan.specialty}`,
    description: artisan.bio,
  };
}

export async function generateStaticParams() {
  return artisans.map((artisan) => ({ slug: artisan.slug }));
}

export default async function ArtisanPage({ params }: ArtisanPageProps) {
  const { slug } = await params;
  const artisan = artisans.find((a) => a.slug === slug);

  if (!artisan) {
    return (
      <div className={styles.notFound}>
        <h1 className={styles.notFoundTitle}>Artesão não encontrado</h1>
        <p className={styles.notFoundText}>
          O artesão que você procura não existe ou foi removido.
        </p>
        <ButtonLink href="/" variant="secondary">
          Voltar ao início
        </ButtonLink>
      </div>
    );
  }

  const artisanProducts = products.filter(
    (p) => p.artisanId === artisan.id && p.isActive
  );

  return (
    <div className={styles.storefront}>
      {/* === Profile Header === */}
      <section className={styles.profileHeader}>
        <div className={styles.profileInner}>
          {artisan.avatarUrl ? (
            <div className={styles.profileAvatar}>
              <Image
                src={artisan.avatarUrl}
                alt={artisan.name}
                fill
                sizes="120px"
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          ) : (
            <div className={styles.profileAvatarFallback}>
              {artisan.name.charAt(0)}
            </div>
          )}

          <div className={styles.profileInfo}>
            <span className={styles.profileSpecialty}>
              {artisan.specialty}
            </span>
            <h1 className={styles.profileName}>{artisan.name}</h1>
            <p className={styles.profileLocation}>
              📍 {artisan.location}
              {artisan.isVerified && (
                <> · <Badge color="sage">✓ Verificado</Badge></>
              )}
            </p>
            <p className={styles.profileBio}>{artisan.bio}</p>

            <div className={styles.profileLinks}>
              {artisan.socialLinks.instagram && (
                <a
                  href={`https://instagram.com/${artisan.socialLinks.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.profileLink}
                >
                  {artisan.socialLinks.instagram}
                </a>
              )}
              {artisan.socialLinks.website && (
                <a
                  href={artisan.socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.profileLink}
                >
                  Website
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* === Products === */}
      <section className={styles.productsArea}>
        <div className={styles.productsInner}>
          <div className={styles.productsHeader}>
            <h2 className={styles.productsTitle}>
              Produtos de {artisan.name}
            </h2>
            <span className={styles.productCount}>
              {artisanProducts.length} {artisanProducts.length === 1 ? 'produto' : 'produtos'}
            </span>
          </div>

          {artisanProducts.length > 0 ? (
            <div className={styles.productsGrid}>
              {artisanProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  artisanName={artisan.name}
                  showArtisan={false}
                />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>🏺</span>
              <p>Este artesão ainda não adicionou produtos.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
