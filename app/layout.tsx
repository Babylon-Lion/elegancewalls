import { Toaster } from '@/components/ui/toaster';
import { PrismicPreview } from '@prismicio/next';
import Footer from 'components/layout/footer';
import MegaMenu from 'components/layout/mega-menu';
import Navbar from 'components/layout/navbar';
import NextAuthProvider from 'components/session-provider';
import ShopifyContext from 'components/shopify-context';
import { ensureStartsWith } from 'lib/utils';
import { Playfair_Display, Roboto } from 'next/font/google';
import Script from 'next/script';
import { repositoryName } from 'prismicio';
import { ReactNode, Suspense } from 'react';
import './globals.css';

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';
const twitterCreator = TWITTER_CREATOR ? ensureStartsWith(TWITTER_CREATOR, '@') : undefined;
const twitterSite = TWITTER_SITE ? ensureStartsWith(TWITTER_SITE, 'https://') : undefined;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  },
  ...(twitterCreator &&
    twitterSite && {
      twitter: {
        card: 'summary_large_image',
        creator: twitterCreator,
        site: twitterSite
      }
    })
};

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair'
});

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: '400'
});

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${roboto.variable}`}>
      <body className=" bg-neutral-50 font-main text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        <Script async strategy="afterInteractive" id="google-tag-manager" defer>
          {` window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-11225121244');`}
        </Script>
        <NextAuthProvider>
          {' '}
          <ShopifyContext>
            <Navbar />
            <MegaMenu />
            <Suspense>
              <main>{children}</main>

              <PrismicPreview repositoryName={repositoryName} />

              <Toaster />
            </Suspense>
            <Footer />
          </ShopifyContext>
        </NextAuthProvider>
      </body>
    </html>
  );
}
