'use client';

import {
  ListItem,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu';
import { Collection } from 'lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// const colors = [{

//   title:"White Wallpaper",hex:"#ffffff"
// }]

const MegaMenuNav = ({ collections }: { collections: Collection[] }) => {
  const mostPopular = Array.from({ length: 4 });

  const [hoveredCollection, setHoveredCollection] = useState('');

  const splitCollections = (n: number): Collection[][] => {
    const length = collections.length;
    const size = Math.ceil(length / n);
    const chunks = [];
    for (let i = 0; i < length; i += size) {
      chunks.push(collections.slice(i, i + size));
    }
    return chunks;
  };

  // Use 3 for splitting collections into three parts for notebook and lower screens
  const collectionChunks = splitCollections(3);

  return (
    <div className="  container  h-full items-center justify-center py-5 md:flex  ">
      <NavigationMenu>
        <NavigationMenuList className="flex gap-10">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent text-white underline opacity-100">
              Shop by collection
            </NavigationMenuTrigger>
            <NavigationMenuContent className="p-3 ">
              <div className="div flex  h-[600px] w-[400px] p-4  md:w-[800px] xl:w-[900px]  ">
                <div className="flex w-1/3 flex-col gap-2 pr-5">
                  <h3 className="text-md col-span-1 font-semibold ">Most Popular</h3>
                  {mostPopular.map((component, index) => (
                    <ListItem
                      key={index}
                      title={'Acoustin WallCovering'}
                      src={'/download.jpeg'}
                      onMouseOver={() => {
                        setHoveredCollection('/download.jpeg');
                      }}
                      onMouseLeave={() => {
                        setHoveredCollection('');
                      }}
                    ></ListItem>
                  ))}
                  {hoveredCollection && (
                    <Image src={hoveredCollection} width={300} height={300} alt="test" />
                  )}
                </div>
                <div className="flex w-2/3  flex-col  gap-2  ">
                  {/* <h3 className="text-md h-8 pb-3 font-semibold">Collections</h3> */}
                  <h3 className="text-md col-span-1 font-semibold ">Most Popular</h3>
                  <div className="flex w-full  gap-3">
                    {collectionChunks.map((chunk, index) => (
                      <div
                        key={index}
                        className="flex max-h-[400px] w-1/3 flex-col gap-2  overflow-hidden rounded-md bg-accent p-3 text-sm font-semibold"
                      >
                        {chunk.map((collection, i) => (
                          <Link
                            key={i}
                            href={collection.path}
                            className="rounded-full p-1 px-2 hover:bg-slate-600 hover:text-white"
                            onMouseOver={() =>
                              collection?.image?.url
                                ? setHoveredCollection(collection.image.url)
                                : setHoveredCollection('')
                            }
                            onMouseLeave={() => setHoveredCollection('')}
                          >
                            {collection.title}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent text-white underline opacity-100">
              Shop by style
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid h-[500px] w-[400px] gap-3 p-4 md:w-[800px] md:grid-cols-2 lg:w-[800px] "></ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent text-white underline opacity-100">
              Shop by color
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid h-[500px] w-[400px] gap-3 p-4 md:w-[800px] md:grid-cols-2 lg:w-[800px] "></ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default MegaMenuNav;
