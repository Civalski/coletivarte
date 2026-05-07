/* ============================================
   User Types
   Domain model for marketplace users
   (artisans and customers).
   ============================================ */

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 'customer' | 'artisan' | 'admin';

export interface Artisan extends User {
  role: 'artisan';
  slug: string;
  bio: string;
  specialty: string;
  location: string;
  bannerUrl: string | null;
  socialLinks: SocialLinks;
  isVerified: boolean;
}

export interface Customer extends User {
  role: 'customer';
}

export interface SocialLinks {
  instagram?: string;
  website?: string;
  whatsapp?: string;
}

export interface CreateArtisanInput {
  email: string;
  name: string;
  bio: string;
  specialty: string;
  location: string;
  socialLinks?: SocialLinks;
}

export interface UpdateArtisanInput {
  name?: string;
  bio?: string;
  specialty?: string;
  location?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  socialLinks?: SocialLinks;
}
