'use client';
import ProductCard from 'components/cards/product-card';
import { Product } from 'lib/shopify/types';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import { Button } from '@/components/ui/button';
import { asText } from '@prismicio/client';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

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
    <div className=" mb-40 h-[500px]">
      <div className=" h-full w-full">
        <h2 className="mb-16 mt-10 text-center text-3xl font-semibold uppercase">
          {asText(title)}
        </h2>
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
        {handle && (
          <div className="mt-3 flex w-full justify-center">
            <Button
              className="border-2 border-black bg-transparent text-black hover:bg-transparent hover:opacity-80"
              asChild
            >
              <Link href={`/search/${handle}`}>View All</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Slider;
