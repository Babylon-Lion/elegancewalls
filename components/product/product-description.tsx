'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';
import { useState } from 'react';
import Calculator from './calculator';
import Quantity from './quantity';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-4 text-5xl font-medium">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>
      <VariantSelector options={product.options} variants={product.variants} />
      <Calculator
        collections={product.collections.nodes}
        setQuantity={setQuantity}
        quantity={quantity}
      />
      <Quantity quantity={quantity} setQuantity={setQuantity} />
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
