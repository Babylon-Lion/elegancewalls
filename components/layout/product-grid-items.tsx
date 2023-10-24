import Grid from 'components/grid';
import { Product } from 'lib/shopify/types';
import ProductCard from 'components/cards/product-card';

export default function ProductGridItems({ products }: { products: Product[] }) {
  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.handle} className="animate-fadeIn lg:mb-5 2xl:mb-0">
          <ProductCard product={product} />
        </Grid.Item>
      ))}
    </>
  );
}
