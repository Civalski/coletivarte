/* ============================================
   User Repository
   Data access layer for users and artisans.
   ============================================ */

import { artisans } from '@/data/artisans';
import type { User, Artisan } from './user.types';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findArtisans(): Promise<Artisan[]>;
  findArtisanBySlug(slug: string): Promise<Artisan | null>;
  findArtisanById(id: string): Promise<Artisan | null>;
}

/**
 * Mock implementation using in-memory data.
 */
export class MockUserRepository implements IUserRepository {
  private artisanData: Artisan[] = [...artisans];

  async findAll(): Promise<User[]> {
    return [...this.artisanData];
  }

  async findById(id: string): Promise<User | null> {
    return this.artisanData.find((a) => a.id === id) ?? null;
  }

  async findArtisans(): Promise<Artisan[]> {
    return [...this.artisanData];
  }

  async findArtisanBySlug(slug: string): Promise<Artisan | null> {
    return this.artisanData.find((a) => a.slug === slug) ?? null;
  }

  async findArtisanById(id: string): Promise<Artisan | null> {
    return this.artisanData.find((a) => a.id === id) ?? null;
  }
}
