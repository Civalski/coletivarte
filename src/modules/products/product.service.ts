/* ============================================
   Product Service
   Business logic layer for products.
   Orchestrates repository calls and applies
   any domain rules.
   ============================================ */

import type {
  Product,
  ProductFilters,
  CreateProductInput,
  UpdateProductInput,
} from './product.types';
import { MockProductRepository, type IProductRepository } from './product.repository';

class ProductService {
  private repository: IProductRepository;

  constructor(repository?: IProductRepository) {
    this.repository = repository ?? new MockProductRepository();
  }

  /** Get all products, optionally filtered. */
  async getAll(filters?: ProductFilters): Promise<Product[]> {
    return this.repository.findAll(filters);
  }

  /** Get active products only (for public storefront). */
  async getActiveProducts(filters?: ProductFilters): Promise<Product[]> {
    return this.repository.findAll({ ...filters, isActive: true });
  }

  /** Get featured products for homepage. */
  async getFeatured(): Promise<Product[]> {
    return this.repository.findAll({ isActive: true, isFeatured: true });
  }

  /** Get a single product by ID. */
  async getById(id: string): Promise<Product | null> {
    return this.repository.findById(id);
  }

  /** Get a single product by slug. */
  async getBySlug(slug: string): Promise<Product | null> {
    return this.repository.findBySlug(slug);
  }

  /** Get all products by a specific artisan. */
  async getByArtisan(artisanId: string): Promise<Product[]> {
    return this.repository.findByArtisan(artisanId);
  }

  /** Create a new product. */
  async create(input: CreateProductInput): Promise<Product> {
    // Business rule: price must be positive
    if (input.price <= 0) {
      throw new Error('Product price must be greater than zero');
    }
    return this.repository.create(input);
  }

  /** Update an existing product. */
  async update(id: string, input: UpdateProductInput): Promise<Product> {
    if (input.price !== undefined && input.price <= 0) {
      throw new Error('Product price must be greater than zero');
    }
    return this.repository.update(id, input);
  }

  /** Delete a product. */
  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}

/** Singleton instance for use across the app. */
export const productService = new ProductService();
