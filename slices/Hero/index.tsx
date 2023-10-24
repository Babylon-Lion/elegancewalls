'use client';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { asLink, asText } from '@prismicio/client';
import { PrismicRichText } from '@prismicio/react';
import Image from 'next/image';
import Link from 'next/link';
import { HeroSlice, HeroSliceDefaultItem } from 'types.generated';

export const HeroComponent = ({ item }: { item: HeroSliceDefaultItem }) => {
  return (
    <div className="relative h-full w-full ">
      <AspectRatio ratio={1 / 1}>
        <Image
          src={item.image.url!}
          fill
          loading="eager"
          className="object-cover"
          alt={item.image.alt! || ''}
        />
        <div className="absolute flex h-full w-full flex-col items-center justify-center  gap-3 ">
          <h2 className="heroHeader text-xl font-bold text-white drop-shadow-lg lg:text-6xl">
            {asText(item.title)}
          </h2>
          <h3 className="text-lg font-semibold text-white lg:text-xl">
            {asText(item.collectiontype)}{' '}
          </h3>

          <Button
            asChild
            size={window.innerWidth > 768 ? 'lg' : 'sm'}
            className="border-1 border-black bg-white text-black drop-shadow-lg hover:bg-white hover:opacity-70"
          >
            <Link href={asLink(item.pagelink)!}>
              <PrismicRichText field={item.button} />
            </Link>
          </Button>
        </div>
      </AspectRatio>
    </div>
  );
};

const Hero = ({ slice }: { slice: HeroSlice }) => {
  const displaySlices = slice.items.map((item, index) => {
    return (
      <div
        className={`${index === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1 '}`}
        key={index}
      >
        <HeroComponent item={item} />
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
