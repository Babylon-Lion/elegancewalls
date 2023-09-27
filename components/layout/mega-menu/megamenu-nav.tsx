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
import Link from 'next/link';
const MegaMenuNav = ({ collections }: { collections: Collection[] }) => {
  const mostPopular = Array.from({ length: 5 });

  const midIndex = Math.ceil(collections.length / 2);

  const displayCollections = (data: Collection[], title?: string) => {
    return (
      <div className="w-1/2 pb-5  ">
        <h3 className="text-md h-8 pb-3 font-semibold">{title}</h3>

        <div className="flex h-full flex-col gap-2  overflow-hidden rounded-md bg-accent p-3 text-sm font-semibold">
          {data.map((component, index) => (
            <Link
              key={index}
              href={component.path}
              className="rounded-full p-1 px-2 hover:bg-slate-600 hover:text-white"
            >
              {component.title}
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="  container  h-full items-center justify-center py-5 md:flex  ">
      <NavigationMenu>
        <NavigationMenuList className="flex gap-10">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent text-white underline opacity-100">
              Shop by collection
            </NavigationMenuTrigger>
            <NavigationMenuContent className="p-3">
              <div className="div flex  w-[400px] p-4  md:w-[900px] lg:w-[900px]  ">
                <div className="flex w-1/2 flex-col gap-2 pr-5">
                  <h3 className="text-md col-span-1 font-semibold ">Most Popular</h3>
                  {mostPopular.map((component, index) => (
                    <ListItem
                      key={index}
                      title={'Acoustin WallCovering'}
                      src={'/download.jpeg'}
                    ></ListItem>
                  ))}
                </div>
                <div className="flex w-1/2 gap-3 ">
                  {displayCollections(collections.slice(0, midIndex), 'Collections')}
                  {displayCollections(collections.slice(midIndex), '')}
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
