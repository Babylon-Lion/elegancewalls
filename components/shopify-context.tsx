'use client';
import { CartProvider, ShopifyProvider } from '@shopify/hydrogen-react';
import React from 'react';

const ShopifyContext = ({ children }: { children: React.ReactNode }) => {
  return (
    <ShopifyProvider
      storeDomain={'https://727d7a.myshopify.com'}
      storefrontToken={'4a90c4d9c10ac1ab43c14d25d442370f'}
      storefrontApiVersion={'2023-10'}
      languageIsoCode="EN"
      countryIsoCode={'US'}
    >
      <CartProvider>{children}</CartProvider>
    </ShopifyProvider>
  );
};

export default ShopifyContext;
