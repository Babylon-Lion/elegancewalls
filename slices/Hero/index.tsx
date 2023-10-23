import { HeroSlice } from 'types.generated';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { asLink, asText } from '@prismicio/client';
import Link from 'next/link';
import { PrismicRichText } from '@prismicio/react';
const Hero = ({ slice }: { slice: HeroSlice }) => {
  const displaySlices = slice.items.map((item, index) => {
    return (
      <div
        className={`${index === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1 '}`}
        key={index}
      >
        <div className="relative h-full w-full ">
          <AspectRatio ratio={1 / 1}>
            <Image
              src={item.image.url!}
              fill
              loading="eager"
              className="object-cover"
              alt={item.image.alt! || ''}
            />
            <div className="absolute flex h-full w-full flex-col items-center justify-center  gap-3 text-white ">
              <h1 className="text-xl font-bold lg:text-4xl">{asText(item.title)}</h1>
              <h3 className="text-lg font-semibold lg:text-xl">{asText(item.collectiontype)} </h3>

              <Button asChild size={'sm'} className="bg-niceBlue">
                <Link href={asLink(item.pagelink)!}>
                  <PrismicRichText field={item.button} />
                </Link>
              </Button>
            </div>
          </AspectRatio>
        </div>
      </div>
    );
  });

  return (
    <div className="grid-rows-auto  grid   h-[600px] grid-cols-2  gap-5 pb-10  md:gap-10 lg:grid-cols-3 lg:grid-rows-2 xl:h-[550px] ">
      {displaySlices}
    </div>
  );
};

export default Hero;
