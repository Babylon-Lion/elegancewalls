import { Input } from '@/components/ui/input';

const Quantity = ({
  quantity,
  setQuantity
}: {
  quantity: number;
  setQuantity: (numb: number) => void;
}) => {
  return (
    <div className="flex flex-col gap-4 pb-5">
      <div>
        <h3 className=" text-lg font-semibold uppercase tracking-wide"> Quantity</h3>
      </div>
      <div className="flex gap-5">
        <button
          aria-label="Calculate"
          onClick={() => {
            quantity - 1 > 0 ? setQuantity(quantity - 1) : setQuantity(1);
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
            setQuantity(quantity + 1);
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
