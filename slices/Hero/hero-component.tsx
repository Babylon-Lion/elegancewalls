'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PrismicRichText } from '@prismicio/react';
import { HeroSliceDefaultItem } from 'types.generated';
import { asLink, asText } from '@prismicio/client';
import Image from 'next/image';

import Link from 'next/link';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';

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
            <h1 className="text-xl font-bold lg:text-4xl">{asText(data.title)}</h1>
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
