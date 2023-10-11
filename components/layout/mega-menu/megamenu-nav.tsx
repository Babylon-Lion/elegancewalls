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
  {
    title: 'Abstract',
    url: 'https://res.cloudinary.com/dw3tmehnz/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1696882317/qa5hh3hwtq1wslobq1su.jpg?_s=public-apps'
  },
  {
    title: 'Animal',
    url: 'https://res.cloudinary.com/dw3tmehnz/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1696882318/s603jf5wvjbwy7ckyjpk.jpg?_s=public-apps'
  },
  {
    title: 'Black & White',
    url: 'https://res.cloudinary.com/dw3tmehnz/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1696882318/sy0twnmhdcw7wmnujfgt.jpg?_s=public-apps'
  },
  {
    title: 'Concrete',
    url: 'https://res.cloudinary.com/dw3tmehnz/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1696882317/gnhg2191qlhkzogleiuw.jpg?_s=public-apps'
  },
  {
    title: 'Damask',
    url: 'https://res.cloudinary.com/dw3tmehnz/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1696882317/jzdwrhjtk39xkdba1zln.jpg?_s=public-apps'
  },
  {
    title: 'Floral',
    url: 'https://res.cloudinary.com/dw3tmehnz/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1696882318/jgscpbevhp3tzahlj0ak.jpg?_s=public-apps'
  },
  {
    title: 'Geometric',
    url: 'https://res.cloudinary.com/dw3tmehnz/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1696882318/jjag1rhrthmnjfg6sz8d.jpg?_s=public-apps'
  },
  {
    title: 'Grasscloth',
    url: 'https://res.cloudinary.com/dw3tmehnz/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1696882318/v40lvt3zyl3r94tbl2c4.jpg?_s=public-apps'
  },
  {
    title: 'Modern',
    url: 'https://res.cloudinary.com/dw3tmehnz/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1696882318/dpmo0aptkboh9mwfxuqt.jpg?_s=public-apps'
  },
  {
    title: 'Plain',
    url: 'https://res.cloudinary.com/dw3tmehnz/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1696882318/enb3cycmomao162mvvs0.jpg?_s=public-apps'
  },
  {
    title: 'Stripes',
    url: 'https://res.cloudinary.com/dw3tmehnz/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1696882318/wctmu5xlgzdgcbwriz8p.jpg?_s=public-apps'
  },
  {
    title: 'Stone',
    url: 'https://res.cloudinary.com/dw3tmehnz/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1696882318/fcmtecnaboavrgj2tsva.jpg?_s=public-apps'
  }
];
const MegaMenuNav = ({ collections }: { collections: Collection[] }) => {
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
    <div className="  container  h-full w-full items-center justify-center py-5 md:flex  ">
      <NavigationMenu id="navItem">
        <NavigationMenuList className="flex w-full gap-10">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent text-white underline opacity-100">
              Shop by collection
            </NavigationMenuTrigger>
            <NavigationMenuContent className="absolute p-3  ">
              <div className="div flex  h-[550px] w-[400px] p-4  md:w-[800px] xl:w-[900px]  ">
                <div className="flex w-1/3 flex-col gap-2 pr-5">
                  <h3 className="text-md col-span-1 font-semibold ">Most Popular</h3>
                  {collections.slice(0, 5).map((component, index) => (
                    <ListItem
                      key={index}
                      title={component.title}
                      src={component.image.url}
                      onMouseOver={() => {
                        setHoveredCollection(component.image.url);
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
            <NavigationMenuContent></NavigationMenuContent>
            <NavigationMenuContent>
              <div className="div flex  h-[550px] w-[400px] p-4  md:w-[800px] xl:w-[900px]  ">
                <div className="flex w-1/3 flex-col gap-2 pr-5">
                  <h3 className="text-md col-span-1 font-semibold ">Most Popular</h3>
                  {wallpaperStyles.slice(0, 5).map((component, index) => (
                    <ListItem key={index} title={component.title} src={component.url}></ListItem>
                  ))}
                  {hoveredCollection && (
                    <Image src={hoveredCollection} width={300} height={300} alt="test" />
                  )}
                </div>
                <div className="flex w-2/3  flex-col  gap-2  ">
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
                            href={`/search?style=${style.title}`}
                            className="rounded-full p-1 px-2 hover:bg-slate-600 hover:text-white "
                            onMouseOver={() => {
                              setHoveredCollection(style.url);
                            }}
                            onMouseLeave={() => {
                              setHoveredCollection('');
                            }}
                          >
                            {style.title}
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
              Shop by color
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="div flex  h-auto w-[400px] p-4  md:w-[800px] xl:w-[900px]  ">
                <div className="flex w-1/3 flex-col gap-2 pr-5">
                  <h3 className="text-md col-span-1 font-semibold ">Most Popular</h3>
                  {colors.slice(0, 5).map((component, index) => (
                    <ListItem key={index} title={component.title} color={component.hex}></ListItem>
                  ))}
                </div>
                <div className="flex w-2/3  flex-col  gap-2  ">
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
