/* ============================================
   User Service
   Business logic layer for users.
   ============================================ */

import type { User, Artisan } from './user.types';
import { MockUserRepository, type IUserRepository } from './user.repository';

class UserService {
  private repository: IUserRepository;

  constructor(repository?: IUserRepository) {
    this.repository = repository ?? new MockUserRepository();
  }

  async getAll(): Promise<User[]> {
    return this.repository.findAll();
  }

  async getById(id: string): Promise<User | null> {
    return this.repository.findById(id);
  }

  async getArtisans(): Promise<Artisan[]> {
    return this.repository.findArtisans();
  }

  async getArtisanBySlug(slug: string): Promise<Artisan | null> {
    return this.repository.findArtisanBySlug(slug);
  }

  async getArtisanById(id: string): Promise<Artisan | null> {
    return this.repository.findArtisanById(id);
  }
}

export const userService = new UserService();
