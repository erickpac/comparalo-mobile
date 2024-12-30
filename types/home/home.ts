import { Product } from "@/types/product/product";

export interface HomeResponse {
  results: HomeResult;
}

export interface HomeResult {
  hero: Hero;
  products: HomeProduct[];
}

export interface Hero {
  id: number;
  product_categories: HeroProductCategory;
}

export interface HeroProductCategory {
  id: number;
  name: string;
  logo: string;
}

export interface HomeProduct {
  id: number;
  products: Product;
}