/* ============================================
   ProductCard Component
   Displays a product in the storefront grid.
   ============================================ */

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from './Badge';
import { formatCurrency } from '@/core/utils/format';
import { PRODUCT_CATEGORY_LABELS } from '@/modules/products/product.types';
import type { Product } from '@/modules/products/product.types';
import styles from './ProductCard.module.css';

export interface ProductCardProps {
  product: Product;
  artisanName?: string;
  showArtisan?: boolean;
}

export function ProductCard({
  product,
  artisanName,
  showArtisan = true,
}: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className={styles.productCard}
      id={`product-card-${product.id}`}
    >
      <div className={styles.imageWrapper}>
        <Image
          src={product.images[0] || '/images/products/ceramics-01.png'}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={styles.image}
        />
        {product.isFeatured && (
          <div className={styles.featuredBadge}>
            <Badge color="ochre">✦ Destaque</Badge>
          </div>
        )}
      </div>

      <div className={styles.body}>
        <span className={styles.category}>
          {PRODUCT_CATEGORY_LABELS[product.category]}
        </span>
        <h3 className={styles.title}>{product.title}</h3>

        {showArtisan && artisanName && (
          <p className={styles.artisan}>
            por <strong>{artisanName}</strong>
          </p>
        )}

        <div className={styles.footer}>
          <span className={styles.price}>{formatCurrency(product.price)}</span>
          {product.stock <= 3 && product.stock > 0 && (
            <Badge color="burgundy">Últimas unidades</Badge>
          )}
        </div>
      </div>
    </Link>
  );
}
