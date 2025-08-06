import type { ProductType } from '../../constants/product.enums';


export interface CreateProductInput {
  name: string;
  slug: string;
  description?: string;
  productType: keyof typeof ProductType;
  enabled?: boolean;
  attributes?: Record<string, any>;
}