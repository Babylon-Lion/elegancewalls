import { useTransition } from 'react';

import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
// import { removeItem, updateItemQuantity } from 'components/cart/actions';
import { useCart } from '@shopify/hydrogen-react';
import LoadingDots from 'components/loading-dots';
export default function EditItemQuantityButton({
  type,
  cartItem
}: {
  type: 'plus' | 'minus';
  cartItem: any;
}) {
  const [isPending, startTransition] = useTransition();
  const { linesUpdate, lines } = useCart();
  const cartIncrease = () => {
    const line = lines?.find(() => cartItem.merchandise.id)!;

    linesUpdate([{ id: line.id!, quantity: line?.quantity! + 1 }]);
  };

  const cartDecrease = () => {
    const line = lines?.find(() => cartItem.merchandise.id)!;

    linesUpdate([{ id: line.id!, quantity: line.quantity! - 1 }]);
  };

  return (
    <button
      aria-label={type === 'plus' ? 'Increase item quantity' : 'Reduce item quantity'}
      onClick={() => {
        startTransition(async () => {
          type === 'minus' ? cartDecrease() : cartIncrease();
        });
      }}
      disabled={isPending}
      className={clsx(
        'ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80',
        {
          'cursor-not-allowed': isPending,
          'ml-auto': type === 'minus'
        }
      )}
    >
      {isPending ? (
        <LoadingDots className="bg-black dark:bg-white" />
      ) : type === 'plus' ? (
        <PlusIcon className="h-4 w-4 dark:text-neutral-500" />
      ) : (
        <MinusIcon className="h-4 w-4 dark:text-neutral-500" />
      )}
    </button>
  );
}
