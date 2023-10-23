import React from 'react';
import HeroComponent from './hero-component';

import { HeroSlice } from 'types.generated';

const Hero = ({ slice }: { slice: HeroSlice }) => {
  const displaySlices = slice.items.map((item, index) => {
    return (
      <HeroComponent
        data={item}
        className={index === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1 '}
        key={index}
      />
    );
  });

  return (
    <div className="grid-rows-auto  grid   h-[500px] grid-cols-2  gap-5 pb-10  md:gap-10 lg:grid-cols-3 lg:grid-rows-2 xl:h-[550px] ">
      {displaySlices}
    </div>
  );
};

export default Hero;
