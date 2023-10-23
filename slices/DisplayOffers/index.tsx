import { Button } from '@/components/ui/button';
import { PrismicRichText } from '@prismicio/react';
import Image from 'next/image';
import { DisplayOffersSlice } from 'types.generated';
import { asText } from '@prismicio/client';
const DisplayOffers = ({ slice }: { slice: DisplayOffersSlice }) => {
  const offers = slice.items.map((item, index) => {
    return (
      <div
        className="relative col-span-1 flex h-[300px] items-center md:max-h-[400px] "
        key={index}
      >
        <div className="md:aspect-video   ">
          <Image src={item?.image?.url!} fill className="absolute" alt={'test'} />
        </div>

        <div
          className=" z-30  flex h-3/4 w-full flex-col justify-center gap-5 p-5 md:h-2/3"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
        >
          {/* <h2 className="text-xl">
            <PrismicRichText field={item.header} />
          </h2> */}

          <p className="text-center font-sans text-xl font-semibold text-niceBlue">
            {asText(item.description)}
          </p>
          <div className="flex  w-full justify-center">
            <Button
              className="w-1/2  border-2 border-black font-semibold text-niceBlue"
              variant={'ghost'}
            >
              {' '}
              <PrismicRichText field={item.buttontext} />
            </Button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="grid h-auto grid-cols-1  gap-10 pt-20 md:h-[400px] md:grid-cols-2 md:pt-10">
      {offers}
    </div>
  );
};

export default DisplayOffers;
