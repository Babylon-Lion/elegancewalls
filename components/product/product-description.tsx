'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import AdditionalInfo from './additional-info';
import Calculator from './calculator';
import Quantity from './quantity';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(
    product.priceRange.maxVariantPrice.amount === '35.16'
      ? 6
      : product.priceRange.maxVariantPrice.amount === '44.75'
      ? 4
      : 1
  );
  const searchParams = useSearchParams();

  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <p>
          {product.variants.length === 1
            ? product.variants[0]?.sku
            : product.variants.find((item) => item.title === searchParams.get('color'))?.sku}
        </p>
        <h1 className="mb-4 text-5xl font-medium">{product.title}</h1>
        <div className="mr-auto flex w-auto gap-2 whitespace-nowrap rounded-full bg-blue-600 p-2 text-sm text-white">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
          {product.priceRange.maxVariantPrice.amount === '44.75' ||
          product.priceRange.maxVariantPrice.amount === '35.16'
            ? ' / Per single roll '
            : product.priceRange.maxVariantPrice.amount === '5.2' ||
              product.priceRange.maxVariantPrice.amount === '4.2 '
            ? ' / Per square foot'
            : null}
        </div>
        <div className="my-2 text-xl font-semibold uppercase">
          {product.priceRange.maxVariantPrice.amount === '44.75'
            ? `Sold in 4x single roll bolts`
            : product.priceRange.maxVariantPrice.amount === '35.16'
            ? `Sold in 6x single roll bolts`
            : product.priceRange.maxVariantPrice.amount === '5.20' ||
              product.priceRange.maxVariantPrice.amount === '4.20 '
            ? `Sold in 1x  `
            : null}
        </div>
        <AdditionalInfo product={product} />
      </div>
      <div></div>
      <VariantSelector options={product.options} variants={product.variants} />
      <Calculator
        collections={product.collections.nodes}
        setQuantity={setQuantity}
        product={product}
      />
      <Quantity
        quantity={quantity}
        setQuantity={setQuantity}
        price={product.priceRange.maxVariantPrice.amount}
      />
      <AddToCart
        variants={product.variants}
        availableForSale={product.availableForSale}
        quantity={quantity}
      />

      {product.descriptionHtml ? (
        <div className="pt-5">
          <Tabs defaultValue="description">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>
            <TabsContent value="description">
              {' '}
              <Prose
                className="mb-6 text-sm leading-tight dark:text-white/[60%]"
                html={product.descriptionHtml}
              />
            </TabsContent>
            <TabsContent value="shipping">
              <p className="font-semibold">Free shipping on orders over $50!</p>
              <ul>
                <li>No-Risk Money Back Guarantee!</li>
                <li>No Hassle Refunds </li>
                <li>Secure Payments</li>
              </ul>
            </TabsContent>
          </Tabs>
        </div>
      ) : null}
    </>
  );
}
