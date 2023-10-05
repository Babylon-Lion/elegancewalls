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
export const colors = [
  { title: 'White', hex: '#ffffff' },
  { title: 'Black', hex: '#000000' },
  { title: 'Blue', hex: '#0000ff' },
  { title: 'Brown', hex: '#8B4513' },
  { title: 'Beige', hex: '#f5f5dc' },
  { title: 'Cream', hex: '#fffdd0' },
  { title: 'Grey', hex: '#808080' },
  { title: 'Orange', hex: '#FFA500' },
  { title: 'Green', hex: '#008000' },
  { title: 'Gold', hex: '#ffd700' },
  { title: 'Silver', hex: '#c0c0c0' },
  { title: 'Pink', hex: '#ffc0cb' },
  { title: 'Yellow', hex: '#ffff00' },
  { title: 'Turquoise', hex: '#40e0d0' }
];

export const wallpaperStyles = [
  'Abstract',
  'Animal',
  'Black & White',
  'Floral',
  'Damask',
  'Concrete',
  'Geometric',
  'Grasscloth',
  'Modern',
  'Plain',
  'Stone',
  'Stripes'
];

const MegaMenuNav = ({ collections }: { collections: Collection[] }) => {
  const mostPopular = Array.from({ length: 4 });

  const [hoveredCollection, setHoveredCollection] = useState('');

  const splitArray = (n: number, array: any[]) => {
    const length = array.length;
    const size = Math.ceil(length / n);
    const chunks = [];
    for (let i = 0; i < length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  const collectionChunks = splitArray(3, collections);
  const colorChunks = splitArray(2, colors);
  const styleChunks = splitArray(2, wallpaperStyles);

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
              <div className="div flex  h-auto w-[400px] p-4  md:w-[800px] xl:w-[900px]  ">
                <div className="flex w-1/3 flex-col gap-2 pr-5">
                  <h3 className="text-md col-span-1 font-semibold ">Most Popular</h3>
                  {mostPopular.map((component, index) => (
                    <ListItem key={index} title={'Abstract'} src={'/download.jpeg'}></ListItem>
                  ))}
                </div>
                <div className="flex w-2/3  flex-col  gap-2  ">
                  {/* <h3 className="text-md h-8 pb-3 font-semibold">Collections</h3> */}
                  <h3 className="text-md col-span-1 font-semibold ">Styles</h3>
                  <div className="flex w-full  gap-3">
                    {styleChunks.map((chunk, index) => (
                      <div
                        key={index}
                        className="flex max-h-[400px] w-1/2 flex-col gap-2  overflow-hidden rounded-md bg-accent p-3 text-sm font-semibold"
                      >
                        {chunk.map((style, i) => (
                          <Link
                            key={i}
                            href={`/search?style=${style}`}
                            className="rounded-full p-1 px-2 hover:bg-slate-600 hover:text-white "
                          >
                            {style}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>{' '}
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent text-white underline opacity-100">
              Shop by color
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="div flex  h-auto w-[400px] p-4  md:w-[800px] xl:w-[900px]  ">
                <div className="flex w-1/3 flex-col gap-2 pr-5">
                  <h3 className="text-md col-span-1 font-semibold ">Most Popular</h3>
                  {mostPopular.map((component, index) => (
                    <ListItem
                      key={index}
                      title={'Blue Wallpaper'}
                      src={'/download.jpeg'}
                      onMouseOver={() => {
                        setHoveredCollection('/download.jpeg');
                      }}
                      onMouseLeave={() => {
                        setHoveredCollection('');
                      }}
                    ></ListItem>
                  ))}
                </div>
                <div className="flex w-2/3  flex-col  gap-2  ">
                  {/* <h3 className="text-md h-8 pb-3 font-semibold">Collections</h3> */}
                  <h3 className="text-md col-span-1 font-semibold ">Colors</h3>
                  <div className="flex w-full  gap-3">
                    {colorChunks.map((chunk, index) => (
                      <div
                        key={index}
                        className="flex max-h-[400px] w-1/2 flex-col gap-2  overflow-hidden rounded-md bg-accent p-3 text-sm font-semibold"
                      >
                        {chunk.map((color, i) => (
                          <Link
                            key={i}
                            href={`/search?color=${color.title}`}
                            className="flex justify-between rounded-full p-1 px-2 hover:bg-slate-600 hover:text-white"
                          >
                            {color.title}
                            <div
                              className={`h-5 w-5 rounded-full `}
                              style={{ backgroundColor: color.hex }}
                            ></div>
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default MegaMenuNav;
