'use server';
import { HIDDEN_PRODUCT_TAG, SHOPIFY_GRAPHQL_API_ENDPOINT, TAGS } from 'lib/constants';
import { isShopifyError } from 'lib/type-guards';
import { ensureStartsWith } from 'lib/utils';
import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import {
  addToCartMutation,
  createCartMutation,
  editCartItemsMutation,
  removeFromCartMutation
} from './mutations/cart';
import {
  createCustomerAccessToken,
  createCustomerAddressMutation,
  createCustomerMutation,
  customerResetMutation,
  recoverCustomerEmailMutation,
  updateCustomerAddressMutation,
  updateCustomerMutation
} from './mutations/customer';
import { getArticleQuery, getBlogsQuery } from './queries/blog';
import { getCartQuery } from './queries/cart';
import {
  getCollectionProductsQuery,
  getCollectionQuery,
  getCollectionsQuery
} from './queries/collection';
import { getCustomerQuery } from './queries/customer';
import { getMenuQuery } from './queries/menu';
import { getPageQuery, getPagesQuery } from './queries/page';
import {
  getProductQuery,
  getProductRecommendationsQuery,
  getProductsQuery
} from './queries/product';
import {
  Address,
  Article,
  Blog,
  Cart,
  Collection,
  Connection,
  CreateCustomerAccessTokenOperation,
  CreateCustomerAddressOperation,
  CreateCustomerOperation,
  CustomerRecoverPasswordOperation,
  GetCustomerOperation,
  Image,
  Menu,
  Page,
  Product,
  RecoverCustomerEmailOperation,
  ShopifyAddToCartOperation,
  ShopifyArticleOperation,
  ShopifyBlogsOperation,
  ShopifyCart,
  ShopifyCartOperation,
  ShopifyCollection,
  ShopifyCollectionOperation,
  ShopifyCollectionProductsOperation,
  ShopifyCollectionsOperation,
  ShopifyCreateCartOperation,
  ShopifyMenuOperation,
  ShopifyPageOperation,
  ShopifyPagesOperation,
  ShopifyProduct,
  ShopifyProductOperation,
  ShopifyProductRecommendationsOperation,
  ShopifyProductsOperation,
  ShopifyRemoveFromCartOperation,
  ShopifyUpdateCartOperation,
  UpdateCustomerAddressOperation,
  UpdateCustomerOperation
} from './types';

const domain = process.env.SHOPIFY_STORE_DOMAIN
  ? ensureStartsWith(process.env.SHOPIFY_STORE_DOMAIN, 'https://')
  : '';
const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

type ExtractVariables<T> = T extends { variables: object } ? T['variables'] : never;
export async function shopifyFetch<T>({
  cache,
  headers,
  query,
  tags,
  variables
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  tags?: string[];
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {
  try {
    const result =
      cache === 'no-store'
        ? await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Shopify-Storefront-Access-Token': key,
              ...headers
            },
            body: JSON.stringify({
              ...(query && { query }),
              ...(variables && { variables })
            }),
            cache: 'no-store',
            ...(tags && { next: { tags } })
          })
        : await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Shopify-Storefront-Access-Token': key,
              ...headers
            },
            body: JSON.stringify({
              ...(query && { query }),
              ...(variables && { variables })
            }),
            cache: 'no-store',
            // next: { revalidate: 0 },
            ...(tags && { next: { tags } })
          });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (e) {
    if (isShopifyError(e)) {
      throw {
        cause: e.cause?.toString() || 'unknown',
        status: e.status || 500,
        message: e.message,
        query
      };
    }

    throw {
      error: e,
      query
    };
  }
}

const removeEdgesAndNodes = (array: Connection<any>) => {
  return array.edges.map((edge) => edge?.node);
};

const reshapeCart = (cart: ShopifyCart): Cart => {
  if (!cart.cost?.totalTaxAmount) {
    cart.cost.totalTaxAmount = {
      amount: '0.0',
      currencyCode: 'USD'
    };
  }

  return {
    ...cart,
    lines: removeEdgesAndNodes(cart.lines)
  };
};

const reshapeCollection = (collection: ShopifyCollection): Collection | undefined => {
  if (!collection) {
    return undefined;
  }

  return {
    ...collection,
    path: `/search/${collection.handle}`
  };
};

const reshapeCollections = (collections: ShopifyCollection[]) => {
  const reshapedCollections = [];

  for (const collection of collections) {
    if (collection) {
      const reshapedCollection = reshapeCollection(collection);

      if (reshapedCollection) {
        reshapedCollections.push(reshapedCollection);
      }
    }
  }

  return reshapedCollections;
};

const reshapeImages = (images: Connection<Image>, productTitle: string) => {
  const flattened = removeEdgesAndNodes(images);

  return flattened.map((image) => {
    const filename = image.url.match(/.*\/(.*)\..*/)[1];
    return {
      ...image,
      altText: image.altText || `${productTitle} - ${filename}`
    };
  });
};

const reshapeProduct = (product: ShopifyProduct, filterHiddenProducts: boolean = true) => {
  if (!product || (filterHiddenProducts && product.tags.includes(HIDDEN_PRODUCT_TAG))) {
    return undefined;
  }

  const { images, variants, ...rest } = product;

  return {
    ...rest,
    images: reshapeImages(images, product.title),
    variants: removeEdgesAndNodes(variants)
  };
};

const reshapeProducts = (products: ShopifyProduct[]) => {
  const reshapedProducts = [];

  for (const product of products) {
    if (product) {
      const reshapedProduct = reshapeProduct(product);

      if (reshapedProduct) {
        reshapedProducts.push(reshapedProduct);
      }
    }
  }

  return reshapedProducts;
};

export async function createCart(): Promise<Cart> {
  const res = await shopifyFetch<ShopifyCreateCartOperation>({
    query: createCartMutation,
    cache: 'no-store'
  });

  return reshapeCart(res.body.data.cartCreate.cart);
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyAddToCartOperation>({
    query: addToCartMutation,
    variables: {
      cartId,
      lines
    },
    cache: 'no-store'
  });
  return reshapeCart(res.body.data.cartLinesAdd.cart);
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  const res = await shopifyFetch<ShopifyRemoveFromCartOperation>({
    query: removeFromCartMutation,
    variables: {
      cartId,
      lineIds
    },
    cache: 'no-store'
  });

  return reshapeCart(res.body.data.cartLinesRemove.cart);
}

export async function updateCart(
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyUpdateCartOperation>({
    query: editCartItemsMutation,
    variables: {
      cartId,
      lines
    },
    cache: 'no-store'
  });

  return reshapeCart(res.body.data.cartLinesUpdate.cart);
}

export async function getCart(cartId: string): Promise<Cart | undefined> {
  const res = await shopifyFetch<ShopifyCartOperation>({
    query: getCartQuery,
    variables: { cartId },
    cache: 'no-store'
  });

  // Old carts becomes `null` when you checkout.
  if (!res.body.data.cart) {
    return undefined;
  }

  return reshapeCart(res.body.data.cart);
}

export async function getCollection(handle: string): Promise<Collection | undefined> {
  const res = await shopifyFetch<ShopifyCollectionOperation>({
    query: getCollectionQuery,
    tags: [TAGS.collections],
    variables: {
      handle
    }
  });

  return reshapeCollection(res.body.data.collection);
}

export async function getCollectionProducts({
  collection,
  reverse,
  sortKey
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
  color?: string;
}): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyCollectionProductsOperation>({
    query: getCollectionProductsQuery,
    tags: [TAGS.collections, TAGS.products],
    variables: {
      handle: collection,
      reverse,
      sortKey: sortKey === 'CREATED_AT' ? 'CREATED' : sortKey
    }
  });

  if (!res.body.data.collection) {
    console.log(`No collection found for \`${collection}\``);
    return [];
  }

  return reshapeProducts(removeEdgesAndNodes(res.body.data.collection.products));
}

export async function getCollections(): Promise<Collection[]> {
  const res = await shopifyFetch<ShopifyCollectionsOperation>({
    query: getCollectionsQuery,
    tags: [TAGS.collections]
  });

  const shopifyCollections = removeEdgesAndNodes(res.body?.data?.collections);
  const collections = [
    {
      handle: '',
      title: 'All',
      description: 'All products',
      image: {
        url: ''
      },
      seo: {
        title: 'All',
        description: 'All products'
      },
      path: '/search',
      updatedAt: new Date().toISOString()
    },
    // Filter out the `hidden` collections.
    // Collections that start with `hidden-*` need to be hidden on the search page.
    ...reshapeCollections(shopifyCollections).filter(
      (collection) => !collection.handle.startsWith('hidden')
    )
  ];

  return collections;
}

export async function getMenu(handle: string): Promise<Menu[]> {
  const res = await shopifyFetch<ShopifyMenuOperation>({
    query: getMenuQuery,
    tags: [TAGS.collections],
    variables: {
      handle
    }
  });

  return (
    res.body?.data?.menu?.items.map((item: { title: string; url: string }) => ({
      title: item.title,
      path: item.url.replace(domain, '').replace('/collections', '/search').replace('/pages', '')
    })) || []
  );
}

export async function getPage(handle: string): Promise<Page> {
  const res = await shopifyFetch<ShopifyPageOperation>({
    query: getPageQuery,
    variables: { handle }
  });

  return res.body.data.pageByHandle;
}

export async function getPages(): Promise<Page[]> {
  const res = await shopifyFetch<ShopifyPagesOperation>({
    query: getPagesQuery
  });

  return removeEdgesAndNodes(res.body.data.pages);
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  const res = await shopifyFetch<ShopifyProductOperation>({
    query: getProductQuery,
    tags: [TAGS.products],
    variables: {
      handle
    }
  });

  return reshapeProduct(res.body.data.product, false);
}

export async function getProductRecommendations(productId: string): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyProductRecommendationsOperation>({
    query: getProductRecommendationsQuery,
    tags: [TAGS.products],
    variables: {
      productId
    }
  });

  return reshapeProducts(res.body.data.productRecommendations);
}

export async function getProducts({
  query,
  reverse,
  sortKey
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyProductsOperation>({
    query: getProductsQuery,
    tags: [TAGS.products],
    variables: {
      query,
      reverse,
      sortKey
    }
  });

  return reshapeProducts(removeEdgesAndNodes(res.body.data.products));
}

export async function getBlogs({
  query,
  reverse,
  sortKey,
  after,
  before
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
  after: string | null;
  before: string | null;
}): Promise<Blog[]> {
  const res = await shopifyFetch<ShopifyBlogsOperation>({
    query: getBlogsQuery(after, before),

    variables: {
      query,
      reverse,
      sortKey,
      after,
      before
    }
  });
  //@ts-ignore
  return removeEdgesAndNodes(res.body.data.blogs);
}

// export async function getBlog({ handle }: { handle: string }): Promise<Blog> {
//   const res = await shopifyFetch<ShopifyBlogOperation>({
//     query: getBlogQuery,
//     variables: {
//       handle
//     }
//   });

//   return res.body.data.blog;
// }

export async function getArticle({ id }: { id: string }): Promise<Article> {
  const res = await shopifyFetch<ShopifyArticleOperation>({
    query: getArticleQuery,

    variables: {
      id
    }
  });

  return res.body.data.article;
}

export async function createCustomer({
  input
}: {
  input: { email: string; password: string };
}): Promise<any> {
  const res = await shopifyFetch<CreateCustomerOperation>({
    query: createCustomerMutation,
    variables: {
      input
    }
  });
  return res.body.data.customerCreate;
}
export async function getCustomerAccessToken({
  input
}: {
  input: { email: string; password: string };
}): Promise<any> {
  const res = await shopifyFetch<CreateCustomerAccessTokenOperation>({
    query: createCustomerAccessToken,
    cache: 'no-store',
    variables: {
      input
    }
  });

  return res.body.data;
}

export async function getCustomer({
  customerAccessToken,
  after
}: {
  customerAccessToken: string;
  after: string | null;
}): Promise<any> {
  const res = await shopifyFetch<GetCustomerOperation>({
    query: getCustomerQuery,
    cache: 'no-store',
    variables: {
      customerAccessToken,
      after
    }
  });

  return res.body.data.customer;
}

export async function updateCustomer({
  input
}: {
  input: {
    firstName: string | null;
    lastName: string | null;
    phone: string | null;
    password: string | null;
  };
}): Promise<any> {
  const res = await shopifyFetch<UpdateCustomerOperation>({
    query: updateCustomerMutation,
    variables: {
      input
    }
  });

  return res.body.data;
}

export async function createCustomerAddress({
  customerAccessToken,
  address
}: {
  customerAccessToken: string;
  address: Address;
}): Promise<any> {
  const res = await shopifyFetch<CreateCustomerAddressOperation>({
    query: createCustomerAddressMutation,
    variables: {
      customerAccessToken,
      address
    }
  });

  return res.body.data;
}

export async function updateCustomerAddress({
  customerAccessToken,
  address,
  id
}: {
  customerAccessToken: string;
  address: Address;
  id: string;
}): Promise<any> {
  const res = await shopifyFetch<UpdateCustomerAddressOperation>({
    query: updateCustomerAddressMutation,
    variables: {
      customerAccessToken,
      address,
      id
    }
  });

  return res.body.data;
}

export async function recoverCustomerEmail({ email }: { email: string }): Promise<any> {
  const res = await shopifyFetch<RecoverCustomerEmailOperation>({
    query: recoverCustomerEmailMutation,
    cache: 'no-store',
    variables: {
      email
    }
  });

  return res.body.data;
}

export async function customerReset({
  resetToken,
  newPassword,
  customerId
}: {
  resetToken: string;
  newPassword: string;
  customerId: string;
}): Promise<any> {
  const res = await shopifyFetch<CustomerRecoverPasswordOperation>({
    query: customerResetMutation,
    cache: 'no-store',

    variables: {
      id: customerId,

      input: {
        password: newPassword,
        resetToken
      }
    }
  });
  if (res.body.data.customerReset.customerUserErrors.length) {
    return null;
  }

  return res.body.data.customerReset.customer;
}

// This is called from `app/api/revalidate.ts` so providers can control revalidation logic.
export async function revalidate(req: NextRequest): Promise<NextResponse> {
  // We always need to respond with a 200 status code to Shopify,
  // otherwise it will continue to retry the request.
  const collectionWebhooks = ['collections/create', 'collections/delete', 'collections/update'];
  const productWebhooks = ['products/create', 'products/delete', 'products/update'];
  const topic = headers().get('x-shopify-topic') || 'unknown';
  const secret = req.nextUrl.searchParams.get('secret');
  const isCollectionUpdate = collectionWebhooks.includes(topic);
  const isProductUpdate = productWebhooks.includes(topic);

  if (!secret || secret !== process.env.SHOPIFY_REVALIDATION_SECRET) {
    console.error('Invalid revalidation secret.');
    return NextResponse.json({ status: 200 });
  }

  if (!isCollectionUpdate && !isProductUpdate) {
    // We don't need to revalidate anything for any other topics.
    return NextResponse.json({ status: 200 });
  }

  if (isCollectionUpdate) {
    revalidateTag(TAGS.collections);
  }

  if (isProductUpdate) {
    revalidateTag(TAGS.products);
  }

  return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
}
