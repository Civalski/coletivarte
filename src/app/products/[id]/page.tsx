/* ============================================
   Product Detail Page
   Individual product view with artisan link.
   ============================================ */

import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import { ButtonLink } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProductCard } from '@/components/ui/ProductCard';
import { formatCurrency } from '@/core/utils/format';
import { PRODUCT_CATEGORY_LABELS } from '@/modules/products/product.types';
import { artisans } from '@/data/artisans';
import { products } from '@/data/products';
import styles from './page.module.css';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(
  { params }: ProductPageProps
): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) return { title: 'Produto não encontrado' };

  const artisan = artisans.find((a) => a.id === product.artisanId);
  return {
    title: `${product.title} — ${artisan?.name ?? 'Coletivarte'}`,
    description: product.description,
  };
}

export async function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h1 className={styles.notFoundTitle}>Produto não encontrado</h1>
        <p className={styles.notFoundText}>
          Este produto não existe ou foi removido.
        </p>
        <ButtonLink href="/" variant="secondary">
          Voltar ao início
        </ButtonLink>
      </div>
    );
  }

  const artisan = artisans.find((a) => a.id === product.artisanId);
  const relatedProducts = products
    .filter(
      (p) =>
        p.id !== product.id &&
        p.isActive &&
        (p.artisanId === product.artisanId || p.category === product.category)
    )
    .slice(0, 3);

  return (
    <div className={styles.productPage}>
      <div className={styles.productDetail}>
        {/* === Image Gallery === */}
        <div className={styles.imageGallery}>
          <div className={styles.mainImage}>
            <Image
              src={product.images[0] || '/images/products/ceramics-01.png'}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        {/* === Product Info === */}
        <div className={styles.productInfo}>
          <div className={styles.breadcrumb}>
            <Link href="/">Início</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            {artisan && (
              <>
                <Link href={`/artisans/${artisan.slug}`}>{artisan.name}</Link>
                <span className={styles.breadcrumbSeparator}>/</span>
              </>
            )}
            <span>{product.title}</span>
          </div>

          <span className={styles.category}>
            {PRODUCT_CATEGORY_LABELS[product.category]}
          </span>

          <h1 className={styles.title}>{product.title}</h1>

          {artisan && (
            <Link
              href={`/artisans/${artisan.slug}`}
              className={styles.artisanLink}
            >
              <div className={styles.artisanAvatar}>
                {artisan.avatarUrl ? (
                  <Image
                    src={artisan.avatarUrl}
                    alt={artisan.name}
                    fill
                    sizes="40px"
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  artisan.name.charAt(0)
                )}
              </div>
              <div className={styles.artisanInfo}>
                <span className={styles.artisanLabel}>Feito por</span>
                <span className={styles.artisanName}>{artisan.name}</span>
              </div>
            </Link>
          )}

          <span className={styles.price}>{formatCurrency(product.price)}</span>

          <p className={styles.description}>{product.description}</p>

          <div className={styles.tags}>
            {product.tags.map((tag) => (
              <Badge key={tag} color="default">
                {tag}
              </Badge>
            ))}
          </div>

          <div className={styles.stockInfo}>
            <span
              className={`${styles.stockDot} ${
                product.stock <= 3 ? styles.stockLow : ''
              }`}
            />
            {product.stock <= 3
              ? `Apenas ${product.stock} em estoque`
              : `${product.stock} disponíveis`}
          </div>

          <div className={styles.actions}>
            <Button variant="primary" size="large" fullWidth>
              Adicionar ao carrinho
            </Button>
            <Button variant="secondary" size="large">
              ♡
            </Button>
          </div>
        </div>
      </div>

      {/* === Related Products === */}
      {relatedProducts.length > 0 && (
        <section className={styles.relatedSection}>
          <div className={styles.relatedInner}>
            <h2 className={styles.relatedTitle}>Você também pode gostar</h2>
            <div className={styles.relatedGrid}>
              {relatedProducts.map((relProd) => {
                const relArtisan = artisans.find(
                  (a) => a.id === relProd.artisanId
                );
                return (
                  <ProductCard
                    key={relProd.id}
                    product={relProd}
                    artisanName={relArtisan?.name}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
