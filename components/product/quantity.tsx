import { Input } from '@/components/ui/input';

const Quantity = ({
  quantity,
  setQuantity,
  price
}: {
  quantity: number;
  setQuantity: (numbe: number) => void;
  price: string;
}) => {
  const increaseAmount = price === '211.0' ? 6 : price === '179.0' ? 4 : 1;
  return (
    <div className="flex flex-col gap-4 pb-5">
      <div>
        <h3 className=" text-lg font-semibold uppercase tracking-wide"> Quantity</h3>
      </div>
      <div className="flex gap-5">
        <button
          aria-label="Calculate"
          onClick={() => {
            quantity - increaseAmount > 0
              ? setQuantity(quantity - increaseAmount)
              : setQuantity(increaseAmount);
          }}
          className={
            'relative flex w-1/3 items-center justify-center rounded-full bg-[#F5F7F9] p-2 tracking-wide  hover:opacity-90'
          }
        >
          -
        </button>
        <Input value={quantity} className="flex w-1/3 justify-center" placeholder="Quantity" />{' '}
        <button
          aria-label="Calculate"
          onClick={() => {
            setQuantity(quantity + increaseAmount);
          }}
          className={
            'relative flex w-1/3 items-center justify-center rounded-full bg-[#F5F7F9] p-2 tracking-wide  hover:opacity-90'
          }
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Quantity;
