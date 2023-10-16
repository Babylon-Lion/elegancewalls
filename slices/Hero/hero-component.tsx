import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PrismicRichText } from '@prismicio/react';
import Image from 'next/image';
import { HeroSliceDefaultItem } from 'types.generated';
import { asLink, asText } from '@prismicio/client';

import Link from 'next/link';

const HeroComponent = ({ data, className }: { data: HeroSliceDefaultItem; className: string }) => {
  return (
    <div className={cn(className)}>
      <div className="relative h-full w-full ">
        {/*/@ts-ignore */}
        <Image
          src={asLink(data.image)!}
          fill
          loading="eager"
          className="absolute"
          alt={asText(data.title)}
          sizes="(min-width: 1024px) 66vw, 100vw"
        />
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
