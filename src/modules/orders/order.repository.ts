/* ============================================
   Order Repository
   Data access layer for orders.
   ============================================ */

import type { Order, CreateOrderInput } from './order.types';

/**
 * Repository interface for order data access.
 */
export interface IOrderRepository {
  findAll(): Promise<Order[]>;
  findById(id: string): Promise<Order | null>;
  findByCustomer(customerId: string): Promise<Order[]>;
  findByArtisan(artisanId: string): Promise<Order[]>;
  create(input: CreateOrderInput): Promise<Order>;
  updateStatus(id: string, status: Order['status']): Promise<Order>;
}

/**
 * Mock implementation — will be replaced with Supabase.
 */
export class MockOrderRepository implements IOrderRepository {
  private data: Order[] = [];

  async findAll(): Promise<Order[]> {
    return [...this.data];
  }

  async findById(id: string): Promise<Order | null> {
    return this.data.find((o) => o.id === id) ?? null;
  }

  async findByCustomer(customerId: string): Promise<Order[]> {
    return this.data.filter((o) => o.customerId === customerId);
  }

  async findByArtisan(artisanId: string): Promise<Order[]> {
    return this.data.filter((o) => o.artisanId === artisanId);
  }

  async create(input: CreateOrderInput): Promise<Order> {
    const order: Order = {
      id: `order_${Date.now()}`,
      ...input,
      items: input.items.map((item) => ({
        ...item,
        totalPrice: item.quantity * item.unitPrice,
      })),
      status: 'pending',
      totalAmount: input.items.reduce(
        (sum, item) => sum + item.quantity * item.unitPrice,
        0
      ),
      paymentId: null,
      notes: input.notes ?? '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.data.push(order);
    return order;
  }

  async updateStatus(id: string, status: Order['status']): Promise<Order> {
    const index = this.data.findIndex((o) => o.id === id);
    if (index === -1) throw new Error(`Order not found: ${id}`);

    this.data[index] = {
      ...this.data[index],
      status,
      updatedAt: new Date(),
    };
    return this.data[index];
  }
}
