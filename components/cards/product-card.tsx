import Price from 'components/price';
import { Product } from 'lib/shopify/types';
import { ScissorsLineDashed, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useAtom } from 'jotai/react';
import { isCartOpenAtom } from 'lib/shopify/jotai';

import { useCart } from '@shopify/hydrogen-react';
import WishlistButton from './wishlist-button';

const ProductCard = ({ product }: { product: Product }) => {
  const [cartOpen, isCartOpen] = useAtom(isCartOpenAtom);

  const { linesAdd } = useCart();

  return (
    <div className="h-full">
      <Link href={`/product/${product.handle}`}>
        <div className="relative mb-2 aspect-square max-h-[80%] w-full">
          <Image fill src={product.featuredImage.url} alt={product.title} className="absolute " />
        </div>
      </Link>

      <div className="flex justify-between">
        <Link href={`/product/${product.handle}`}>
          <div className="flex flex-col gap-1">
            <p className="font-semibold">
              {product.title.length > 40 ? product.title.slice(0, 40) + '...' : product.title}
            </p>
            <p className="font-semibold">
              <Price
                amount={product.priceRange.maxVariantPrice.amount}
                currencyCode={product.priceRange.maxVariantPrice.currencyCode}
              />
            </p>
          </div>
        </Link>

        <div className="flex gap-2">
          <ShoppingCart
            className="cursor-pointer"
            onClick={() => {
              // Safeguard in case someone messes with `disabled` in devtools.

              linesAdd([
                {
                  merchandiseId: product.variants[0]?.id!,
                  quantity: 1
                }
              ]);
              isCartOpen(true);
            }}
          />
          <ScissorsLineDashed />
          <WishlistButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
