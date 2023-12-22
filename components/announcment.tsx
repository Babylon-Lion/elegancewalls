import React from 'react';

const Announcment = () => {
  return (
    <div className="h-10 w-full bg-gold">
      <div className="text-uppercase animation-slide animation-carousel container flex h-full items-center justify-center font-semibold">
        <p className="overflow-hidden whitespace-nowrap">
          use code <span className="font-bold underline"> HOLIDAY23</span> to get 20% discount on
          your purchase
        </p>
      </div>
    </div>
  );
};

export default Announcment;
