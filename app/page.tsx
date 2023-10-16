// import { Carousel } from 'components/carousel';
// import { ThreeItemGrid } from 'components/grid/three-items';
// import Footer from 'components/layout/footer';
// import { Suspense } from 'react';
import { createClient } from 'prismicio';
import { SliceZone } from '@prismicio/react';
import { components } from '../slices/components';
export const runtime = 'edge';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  const client = createClient();

  const page = await client.getByUID('home', 'homepage');

  return (
    <div className="container min-h-screen">
      <SliceZone components={components} slices={page.data.slices} />
      {/* <ThreeItemGrid />
      <Suspense>
        <Carousel />
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense> */}
    </div>
  );
}
