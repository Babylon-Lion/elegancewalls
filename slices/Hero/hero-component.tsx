'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { asLink, asText } from '@prismicio/client';
import { PrismicRichText } from '@prismicio/react';
import Image from 'next/image';
import { HeroSliceDefaultItem } from 'types.generated';

import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import Link from 'next/link';

const HeroComponent = ({ data, className }: { data: HeroSliceDefaultItem; className: string }) => {
  return (
    <div className={cn(className)}>
      <div className="relative h-full w-full ">
        <AspectRatio ratio={1 / 1}>
          <Image
            src={data.image.url!}
            fill
            loading="eager"
            className="object-cover"
            alt={data.image.alt! || ''}
          />
          <div className="absolute flex h-full w-full flex-col items-center justify-center  gap-3 text-white ">
            <h1 className="text-xl font-bold lg:text-6xl">{asText(data.title)}</h1>
            <h3 className="text-lg font-semibold lg:text-xl">{asText(data.collectiontype)} </h3>

            <Button asChild size={'sm'} className="bg-niceBlue">
              <Link href={asLink(data.pagelink)!}>
                <PrismicRichText field={data.button} />
              </Link>
            </Button>
          </div>
        </AspectRatio>
      </div>
    </div>
  );
};

export default HeroComponent;
