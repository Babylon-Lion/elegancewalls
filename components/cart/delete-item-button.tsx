import { XMarkIcon } from '@heroicons/react/24/outline';
import LoadingDots from 'components/loading-dots';
import { useCart } from '@shopify/hydrogen-react';

import clsx from 'clsx';
import { useTransition } from 'react';

export default function DeleteItemButton({ cartItem }: { cartItem: any }) {
  const [isPending, startTransition] = useTransition();

  const { linesRemove, lines } = useCart();

  const cartRemove = () => {
    const line = lines?.find(() => cartItem.merchandise.id)!;

    linesRemove([line?.id!]);
    // removeItem(obj)
  };

  return (
    <button
      aria-label="Remove cart item"
      onClick={() => {
        startTransition(async () => {
          cartRemove();
        });
      }}
      disabled={isPending}
      className={clsx(
        'ease flex h-[17px] w-[17px] items-center justify-center rounded-full bg-neutral-500 transition-all duration-200',
        {
          'cursor-not-allowed px-0': isPending
        }
      )}
    >
      {isPending ? (
        <LoadingDots className="bg-white" />
      ) : (
        <XMarkIcon className="hover:text-accent-3 mx-[1px] h-4 w-4 text-white dark:text-black" />
      )}
    </button>
  );
}
