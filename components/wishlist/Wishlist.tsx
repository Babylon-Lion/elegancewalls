'use client';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Image from 'next/image';
import { Product } from 'lib/shopify/types';

import Price from 'components/price';

import { X } from 'lucide-react';
import Link from 'next/link';

export default function WishList({ className }: { className?: string }) {
  const initialWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  const [wishlist, setWishlist] = useState(initialWishlist);

  const displayWishListItems = wishlist.map((item: Product, index: number) => {
    return (
      <div key={index} className="flex gap-2">
        <Link href={`/product/${item.handle}`}>
          <Image
            width={64}
            height={64}
            alt={item.title}
            src={item.featuredImage.url}
            className="rounded-md"
          />
        </Link>
        <Link href={`/product/${item.handle}`}>
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold"> {item.title}</p>
            <Price
              amount={item.priceRange.maxVariantPrice.amount}
              currencyCode={item.priceRange.maxVariantPrice.currencyCode}
            />
          </div>
        </Link>

        <div>
          <X
            onClick={() => {
              setWishlist(wishlist.filter((product: any) => product.id != item.id));
            }}
          />
        </div>
      </div>
    );
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <Popover>
      <PopoverTrigger>
        {' '}
        <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
          <Heart className={clsx('h-4 transition-all ease-in-out hover:scale-110 ', className)} />

          {wishlist.length ? (
            <div className="bg-blue-600 absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded text-[11px] font-medium text-red-600">
              {wishlist.length}
            </div>
          ) : null}
        </div>
      </PopoverTrigger>
      <PopoverContent className="max-h-[300px] space-y-5 overflow-y-auto">
        {wishlist.length ? (
          displayWishListItems
        ) : (
          <div className="felx justify-center font-semibold">Wishlist is empty</div>
        )}
      </PopoverContent>
    </Popover>
  );
}
