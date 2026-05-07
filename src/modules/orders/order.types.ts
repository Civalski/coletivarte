/* ============================================
   Order Types
   Domain model for marketplace orders.
   ============================================ */

export interface Order {
  id: string;
  customerId: string;
  artisanId: string;
  items: OrderItem[];
  status: OrderStatus;
  totalAmount: number;
  shippingAddress: ShippingAddress;
  paymentId: string | null;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  productId: string;
  productTitle: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface ShippingAddress {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface CreateOrderInput {
  customerId: string;
  artisanId: string;
  items: Omit<OrderItem, 'totalPrice'>[];
  shippingAddress: ShippingAddress;
  notes?: string;
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Pendente',
  confirmed: 'Confirmado',
  processing: 'Em Produção',
  shipped: 'Enviado',
  delivered: 'Entregue',
  cancelled: 'Cancelado',
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  pending: 'var(--color-ochre)',
  confirmed: 'var(--color-sage)',
  processing: 'var(--color-indigo)',
  shipped: 'var(--color-terracotta)',
  delivered: 'var(--color-sage)',
  cancelled: 'var(--color-burgundy)',
};
