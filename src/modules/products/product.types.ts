/* ============================================
   Product Types
   Domain model for marketplace products.
   ============================================ */

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  category: ProductCategory;
  artisanId: string;
  images: string[];
  tags: string[];
  stock: number;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductCategory =
  | 'ceramica'
  | 'joalheria'
  | 'texteis'
  | 'pintura'
  | 'escultura'
  | 'madeira'
  | 'couro'
  | 'outro';

export interface ProductFilters {
  category?: ProductCategory;
  artisanId?: string;
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
  isActive?: boolean;
  isFeatured?: boolean;
}

export interface CreateProductInput {
  title: string;
  description: string;
  price: number;
  category: ProductCategory;
  artisanId: string;
  images: string[];
  tags: string[];
  stock: number;
}

export interface UpdateProductInput {
  title?: string;
  description?: string;
  price?: number;
  category?: ProductCategory;
  images?: string[];
  tags?: string[];
  stock?: number;
  isActive?: boolean;
  isFeatured?: boolean;
}

export const PRODUCT_CATEGORY_LABELS: Record<ProductCategory, string> = {
  ceramica: 'Cerâmica',
  joalheria: 'Joalheria',
  texteis: 'Têxteis',
  pintura: 'Pintura',
  escultura: 'Escultura',
  madeira: 'Madeira',
  couro: 'Couro',
  outro: 'Outro',
};
