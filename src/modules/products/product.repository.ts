/* ============================================
   Product Repository
   Data access layer for products.
   Currently backed by mock data — will be
   replaced with Supabase when integrated.
   ============================================ */

import { products } from '@/data/products';
import type {
  Product,
  ProductFilters,
  CreateProductInput,
  UpdateProductInput,
} from './product.types';

/**
 * Repository interface defining data access contract.
 * This abstraction allows swapping data sources without
 * changing service or UI code.
 */
export interface IProductRepository {
  findAll(filters?: ProductFilters): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  findBySlug(slug: string): Promise<Product | null>;
  findByArtisan(artisanId: string): Promise<Product[]>;
  create(input: CreateProductInput): Promise<Product>;
  update(id: string, input: UpdateProductInput): Promise<Product>;
  delete(id: string): Promise<void>;
}

/**
 * Mock implementation using in-memory data.
 * Replace with SupabaseProductRepository when DB is integrated.
 */
export class MockProductRepository implements IProductRepository {
  private data: Product[] = [...products];

  async findAll(filters?: ProductFilters): Promise<Product[]> {
    let result = [...this.data];

    if (filters?.category) {
      result = result.filter((p) => p.category === filters.category);
    }
    if (filters?.artisanId) {
      result = result.filter((p) => p.artisanId === filters.artisanId);
    }
    if (filters?.isActive !== undefined) {
      result = result.filter((p) => p.isActive === filters.isActive);
    }
    if (filters?.isFeatured !== undefined) {
      result = result.filter((p) => p.isFeatured === filters.isFeatured);
    }
    if (filters?.minPrice !== undefined) {
      result = result.filter((p) => p.price >= filters.minPrice!);
    }
    if (filters?.maxPrice !== undefined) {
      result = result.filter((p) => p.price <= filters.maxPrice!);
    }

    return result;
  }

  async findById(id: string): Promise<Product | null> {
    return this.data.find((p) => p.id === id) ?? null;
  }

  async findBySlug(slug: string): Promise<Product | null> {
    return this.data.find((p) => p.slug === slug) ?? null;
  }

  async findByArtisan(artisanId: string): Promise<Product[]> {
    return this.data.filter((p) => p.artisanId === artisanId);
  }

  async create(input: CreateProductInput): Promise<Product> {
    const product: Product = {
      ...input,
      id: `prod_${Date.now()}`,
      slug: input.title.toLowerCase().replace(/\s+/g, '-'),
      isActive: true,
      isFeatured: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.data.push(product);
    return product;
  }

  async update(id: string, input: UpdateProductInput): Promise<Product> {
    const index = this.data.findIndex((p) => p.id === id);
    if (index === -1) throw new Error(`Product not found: ${id}`);

    this.data[index] = {
      ...this.data[index],
      ...input,
      updatedAt: new Date(),
    };
    return this.data[index];
  }

  async delete(id: string): Promise<void> {
    this.data = this.data.filter((p) => p.id !== id);
  }
}
