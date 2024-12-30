import { Product } from "@/types/product/product";

export interface CategoriesResponse {
  results: Category[];
}

export interface Category {
  id: number;
  name: string;
  logo: string;
}

export interface ProductsByCategoryIdResponse {
  info: {
    count: number;
    currentPage: number;
    page: number;
    next: string;
    prev: string | null;
  };
  results: Product[];
}
