export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  weightCarats: number;
  shape: string;
  color: string;
  clarity: string;
  treatment: string;
  origin: string;
  imageUrl: string;
  description: string;
  inStock: boolean;
  dateAdded: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  productCount: number;
  bestSellerPercent: number;
  colors: string[];
}
