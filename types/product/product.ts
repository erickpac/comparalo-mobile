import { Category } from "@/types/category/category";
import { Store } from "@/types/store/store";
import { PriceHistory } from "@/types/product/price-history";

export interface Product {
  id: number;
  name: string;
  description?: string;
  model_code: string;
  category_id: number;
  brand_name: string;
  detail_url: string;
  image_url: string;
  current_price: number;
  sale_price: number;
  sku: string;
  composite_id: string;
  store_id: number;
  related_count?: number;
}

export interface ProductDetail extends Product {
  stores: Store;
  product_categories: Category;
}

export interface RelatedProduct extends ProductDetail {}

interface ProductDetailResults {
  product: ProductDetail;
  priceHistory: PriceHistory[];
  relatedProducts: RelatedProduct[];
}

export interface ProductDetailResponse {
  results: ProductDetailResults;
}
