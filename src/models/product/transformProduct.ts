import { Product } from '../../generated/prisma/client';
import { ProductType } from '../../constants/product.enums';

export function transformProduct(product: Product) {
  return {
    ...product,
    productTypeLabel: ProductType[product.productType as keyof typeof ProductType],
  };
}