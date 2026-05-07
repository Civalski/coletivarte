/* ============================================
   Order Service
   Business logic layer for orders.
   ============================================ */

import type { Order, CreateOrderInput } from './order.types';
import { MockOrderRepository, type IOrderRepository } from './order.repository';

class OrderService {
  private repository: IOrderRepository;

  constructor(repository?: IOrderRepository) {
    this.repository = repository ?? new MockOrderRepository();
  }

  async getAll(): Promise<Order[]> {
    return this.repository.findAll();
  }

  async getById(id: string): Promise<Order | null> {
    return this.repository.findById(id);
  }

  async getByCustomer(customerId: string): Promise<Order[]> {
    return this.repository.findByCustomer(customerId);
  }

  async getByArtisan(artisanId: string): Promise<Order[]> {
    return this.repository.findByArtisan(artisanId);
  }

  async create(input: CreateOrderInput): Promise<Order> {
    if (input.items.length === 0) {
      throw new Error('Order must have at least one item');
    }
    return this.repository.create(input);
  }

  async updateStatus(id: string, status: Order['status']): Promise<Order> {
    return this.repository.updateStatus(id, status);
  }
}

export const orderService = new OrderService();
