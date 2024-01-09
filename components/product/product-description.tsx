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
import { formatCurrency } from 'lib/currency';

export function ProductDescription({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(
    product.priceRange.maxVariantPrice.amount === '211.0'
      ? 6
      : product.priceRange.maxVariantPrice.amount === '179.0'
      ? 4
      : 1
  );
  const searchParams = useSearchParams();

  // console.log(product.priceRange.maxVariantPrice.amount, 'test1234123123123','how much bro');

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
          {product.priceRange.maxVariantPrice.amount === '179.0' ||
          product.priceRange.maxVariantPrice.amount === '211.0'
            ? ' / Per single roll '
            : ' / Per square foot'}
        </div>
        <div className="my-2 text-xl font-semibold uppercase">
          {product.priceRange.maxVariantPrice.amount === '179.0' ||
          product.priceRange.maxVariantPrice.amount === '211.0'
            ? `Price per ${
                product.priceRange.maxVariantPrice.amount === '211.0' ? '6' : '4'
              } roll is ${formatCurrency(
                quantity * parseFloat(product.priceRange.maxVariantPrice.amount)
              )} `
            : `Price per ${quantity} square foot is ${formatCurrency(
                quantity * parseFloat(product.priceRange.maxVariantPrice.amount)
              )} `}
        </div>
        <AdditionalInfo product={product} />
      </div>
      <div></div>
      <VariantSelector options={product.options} variants={product.variants} />
      <Calculator collections={product.collections.nodes} setQuantity={setQuantity} />
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
