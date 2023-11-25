import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import LogoSquare from 'components/logo-square';
// import { getBlogs } from 'lib/shopify';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import Search from './search';
import { getCollections } from 'lib/shopify';
const { SITE_NAME } = process.env;
import WishList from 'components/wishlist';
import LogIn from 'components/profile/profile-popover';

export default async function Navbar() {
  const collections = await getCollections();
  // const blogs = await getBlogs({ after: '' });

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <MobileMenu collections={collections} />
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <Link href="/" className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6">
            <LogoSquare />
            <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
              {SITE_NAME}
            </div>
          </Link>
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          <Search />
        </div>
        <div className="flex justify-end gap-2 md:w-1/3">
          <Suspense fallback={<OpenCart />}>
            <Cart />
            <WishList />
          </Suspense>
          <LogIn />
        </div>
      </div>
    </nav>
  );
}
