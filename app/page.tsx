import { SliceZone } from '@prismicio/react';
import { Metadata } from 'next';
import { createClient } from 'prismicio';
import { components } from '../slices/components';
export const runtime = 'edge';

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();

  const page = await client.getByUID('home', 'homepage');

  return {
    title: page.data.meta_title || 'Elegancewalls',
    description: page.data.meta_description || 'Elegant Wallpaper',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true
      }
    },
    //@ts-ignore
    openGraph: page?.data?.meta_image
      ? {
          images: [
            {
              url: page.data.meta_image.url,
              width: page.data.meta_image.dimensions?.width,
              height: page.data.meta_image.dimensions?.height,
              alt: page.data.meta_image.alt
            }
          ]
        }
      : null
  };
}

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
