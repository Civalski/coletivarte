/* ============================================
   Admin Dashboard Page
   Overview for artisan admin area.
   ============================================ */

import React from 'react';
import Link from 'next/link';
import { StatsCard } from '@/components/admin/StatsCard';
import { formatCurrency } from '@/core/utils/format';
import styles from './page.module.css';

// Mock dashboard data
const MOCK_STATS = {
  totalSales: 4850.0,
  activeProducts: 6,
  pendingOrders: 3,
  totalCustomers: 28,
};

const MOCK_ORDERS = [
  {
    id: 'PED-001',
    customer: 'Ana Clara',
    product: 'Vaso Orgânico Terra',
    amount: 189.0,
    status: 'pending' as const,
    date: '05/05/2026',
  },
  {
    id: 'PED-002',
    customer: 'Carlos Eduardo',
    product: 'Conjunto de Bowls Raiz',
    amount: 245.0,
    status: 'confirmed' as const,
    date: '04/05/2026',
  },
  {
    id: 'PED-003',
    customer: 'Julia Mendes',
    product: 'Xícara Contemplação (x2)',
    amount: 156.0,
    status: 'processing' as const,
    date: '03/05/2026',
  },
  {
    id: 'PED-004',
    customer: 'Pedro Alves',
    product: 'Vaso Orgânico Terra',
    amount: 189.0,
    status: 'shipped' as const,
    date: '01/05/2026',
  },
  {
    id: 'PED-005',
    customer: 'Mariana Costa',
    product: 'Xícara Contemplação',
    amount: 78.0,
    status: 'confirmed' as const,
    date: '30/04/2026',
  },
];

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pendente',
  confirmed: 'Confirmado',
  processing: 'Em Produção',
  shipped: 'Enviado',
};

const STATUS_CLASSES: Record<string, string> = {
  pending: styles.statusPending,
  confirmed: styles.statusConfirmed,
  processing: styles.statusProcessing,
  shipped: styles.statusShipped,
};

export default function AdminDashboard() {
  return (
    <div className={styles.dashboard} id="admin-dashboard">
      {/* === Header === */}
      <div className={styles.header}>
        <p className={styles.greeting}>Bem-vinda de volta,</p>
        <h1 className={styles.title}>Marina Oliveira</h1>
      </div>

      {/* === Stats === */}
      <div className={styles.statsGrid}>
        <StatsCard
          label="Vendas Totais"
          value={formatCurrency(MOCK_STATS.totalSales)}
          icon="◈"
          color="terracotta"
          change="+12% este mês"
          changeType="positive"
        />
        <StatsCard
          label="Produtos Ativos"
          value={String(MOCK_STATS.activeProducts)}
          icon="❋"
          color="sage"
        />
        <StatsCard
          label="Pedidos Pendentes"
          value={String(MOCK_STATS.pendingOrders)}
          icon="◔"
          color="ochre"
          change="3 novos"
          changeType="positive"
        />
        <StatsCard
          label="Clientes"
          value={String(MOCK_STATS.totalCustomers)}
          icon="◎"
          color="indigo"
          change="+5 este mês"
          changeType="positive"
        />
      </div>

      {/* === Recent Orders === */}
      <div className={styles.ordersSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Pedidos Recentes</h2>
          <Link href="/admin" className={styles.sectionLink}>
            Ver todos →
          </Link>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Pedido</th>
              <th>Cliente</th>
              <th>Produto</th>
              <th>Valor</th>
              <th>Status</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_ORDERS.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td className={styles.orderCustomer}>{order.customer}</td>
                <td>{order.product}</td>
                <td className={styles.orderAmount}>
                  {formatCurrency(order.amount)}
                </td>
                <td>
                  <span
                    className={`${styles.statusBadge} ${
                      STATUS_CLASSES[order.status]
                    }`}
                  >
                    {STATUS_LABELS[order.status]}
                  </span>
                </td>
                <td>{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* === Quick Actions === */}
      <div>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Ações Rápidas</h2>
        </div>

        <div className={styles.quickActions}>
          <Link href="/admin" className={styles.actionCard}>
            <div className={styles.actionIcon}>✚</div>
            <div>
              <div className={styles.actionLabel}>Novo Produto</div>
              <div className={styles.actionDesc}>
                Adicione uma nova peça à sua loja
              </div>
            </div>
          </Link>
          <Link href="/admin" className={styles.actionCard}>
            <div className={styles.actionIcon}>📦</div>
            <div>
              <div className={styles.actionLabel}>Gerenciar Estoque</div>
              <div className={styles.actionDesc}>
                Atualize quantidades e preços
              </div>
            </div>
          </Link>
          <Link href="/admin" className={styles.actionCard}>
            <div className={styles.actionIcon}>📊</div>
            <div>
              <div className={styles.actionLabel}>Ver Relatórios</div>
              <div className={styles.actionDesc}>
                Acompanhe suas vendas e métricas
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
