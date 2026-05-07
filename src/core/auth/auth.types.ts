/* ============================================
   Auth Types
   Authentication and authorization types.
   ============================================ */

import type { UserRole } from '@/modules/users/user.types';

export interface Session {
  userId: string;
  email: string;
  role: UserRole;
  expiresAt: Date;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  name: string;
  role: 'customer' | 'artisan';
}
