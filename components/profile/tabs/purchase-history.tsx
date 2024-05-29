'use client';
import { Button } from '@/components/ui/button';
import { Customer, Order } from 'lib/shopify/types';
import { createUrl } from 'lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import Price from '../../price';
const PurchaseHistory = ({ customer }: { customer: Customer }) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const newParams = new URLSearchParams(searchParams.toString());
  // for customer orders pagination
  newParams.set('after', customer.orders.pageInfo.endCursor);

  return (
    <div className="border-orange relative mt-5 h-[300px] max-h-[400px] w-full overflow-y-auto rounded-xl border-2 p-5">
      {customer.orders.nodes.length ? (
        customer.orders.nodes.map((item, index) => {
          return <PurchaseHistoryCard order={item} key={index} />;
        })
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          {' '}
          <div className="flex flex-col items-center gap-3 ">
            <h2 className="text-orange font-secondary text-2xl font-semibold"> No orders found</h2>{' '}
            <Link href="/wallpaper">
              {' '}
              <Button className=" font-secondary">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      )}
      {customer.orders.pageInfo.hasNextPage && (
        <div className="absolute bottom-2 flex  w-full  justify-center font-main">
          <Link href={createUrl(pathName, newParams)}>
            <Button className="bg-commonblack ">Load More</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default PurchaseHistory;

export const PurchaseHistoryCard = ({ order }: { order: Order }) => {
  return (
    <div className="border-orange flex items-center justify-between border-b-2 py-5">
      <div className="flex gap-5">
        <div className="relative aspect-square h-44 w-44">
          <Link href={order.statusUrl}>
            <Image
              className="border-orange h-1/4 w-1/4 rounded-2xl border-2 object-cover"
              src={order.lineItems.nodes[0].variant.image.url}
              alt="Order product"
              fill
            />
          </Link>
        </div>
        <div className="flex flex-col gap-4 ">
          <p className="font-semibold">Product Qty: {order.lineItems.nodes.length}</p>

          <Price
            amount={order.currentSubtotalPrice.amount}
            className="text-orange font-secondary text-xl font-semibold"
            currencyCode="usd"
          />
          <Link href={order.statusUrl} className="text-orange hover:underline">
            Status page
          </Link>
        </div>
      </div>
      <div>
        <p className="text-orange font-semibold">Date: {order.processedAt}</p>
      </div>
    </div>
  );
};
