'use client';
import ProductCard from 'components/cards/product-card';
import { Product } from 'lib/shopify/types';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { asText } from '@prismicio/client';

const Slider = ({
  productData,
  handle,
  title
}: {
  productData: Product[];
  handle: string | null;
  title: any;
}) => {
  const displayProducts = productData.slice(0, 10).map((item, index) => {
    return (
      <SwiperSlide key={index}>
        {' '}
        <ProductCard product={item} />
      </SwiperSlide>
    );
  });

  return (
    <div className=" mb-20 h-[500px]">
      <div className=" h-full w-full">
        <h2 className="mb-7 text-center text-3xl font-semibold uppercase">{asText(title)}</h2>
        <Swiper
          navigation={true}
          pagination={{
            clickable: true
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40
            },
            1000: {
              slidesPerView: 3,
              spaceBetween: 30
            },
            1300: {
              slidesPerView: 4,
              spaceBetween: 50
            }
          }}
          className="h-[430px]  "
          modules={[Pagination, Navigation]}
        >
          {displayProducts}
        </Swiper>

        <div className="mt-3 flex w-full justify-center">
          <Button
            className="text-wblack border-2 border-black bg-transparent hover:bg-transparent hover:opacity-80"
            asChild
          >
            <Link href={`/search/${handle}`}>View All</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Slider;
