'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PrismicRichText } from '@prismicio/react';
import { HeroSliceDefaultItem } from 'types.generated';
import { asLink } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';

import Link from 'next/link';

const HeroComponent = ({ data, className }: { data: HeroSliceDefaultItem; className: string }) => {
  console.log(data.image);
  return (
    <div className={cn(className)}>
      <div className="relative h-full w-full ">
        <PrismicNextImage field={data.image} fill loading="eager" className="absolute" />

        <div className="absolute flex h-full w-full flex-col items-center justify-center  gap-3 text-white">
          <h3 className="text-xl font-bold lg:text-3xl">
            <PrismicRichText field={data.title} />
          </h3>
          <h3 className="text-lg font-semibold lg:text-xl">
            <PrismicRichText field={data.collectiontype} />
          </h3>

          <Button asChild size={'sm'} className="bg-blue">
            <Link href={asLink(data.pagelink)!}>
              <PrismicRichText field={data.button} />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroComponent;
