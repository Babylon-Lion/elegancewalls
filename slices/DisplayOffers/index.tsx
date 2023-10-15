import { Button } from '@/components/ui/button';
import { asText } from '@prismicio/client';
import { PrismicRichText } from '@prismicio/react';
import Image from 'next/image';
import { DisplayOffersSlice } from 'types.generated';
const DisplayOffers = ({ slice }: { slice: DisplayOffersSlice }) => {
  const offers = slice.items.map((item, index) => {
    return (
      <div className="relative col-span-1 flex h-[350px] items-center " key={index}>
        <div>
          {/*/@ts-ignore */}
          <Image src={item.image.url} fill className="absolute" alt={asText(item.header)} />
        </div>

        <div
          className=" z-30  flex h-2/3 w-full flex-col gap-5 p-5"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
        >
          <h2 className="text-xl">
            <PrismicRichText field={item.header} />
          </h2>

          <p>
            <PrismicRichText field={item.description} />
          </p>
          <div className="flex  w-full">
            <Button className="w-1/2 bg-blue">
              {' '}
              <PrismicRichText field={item.buttontext} />
            </Button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="my-10 grid  h-auto grid-cols-1 gap-10 md:h-[400px] md:grid-cols-2">
      {offers}
    </div>
  );
};

export default DisplayOffers;
