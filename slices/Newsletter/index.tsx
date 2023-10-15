'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Instagram, Facebook, Twitter } from 'lucide-react';
import { NewsletterSlice } from 'types.generated';
import Link from 'next/link';

import { asLink } from '@prismicio/client';
const Newsletter = ({ slice }: { slice: NewsletterSlice }) => {
  return (
    <div className=" h-auto w-full py-10  md:h-32">
      <div className="container flex flex-col items-center  gap-10 md:flex-row  md:gap-20">
        <div className="flex w-full flex-col gap-2  md:w-1/2  ">
          <h4 className="block text-xl font-semibold">Stay Updated</h4>
          <div className="flex  w-full items-center justify-end gap-2 md:w-2/3">
            <Input placeholder="Your email" />
            <Button className="bg-blue">Subscribe</Button>
          </div>
        </div>

        <div className="flex w-full flex-col gap-2 md:w-1/2">
          <h4 className="block text-xl font-semibold">Stay Connected</h4>

          <div className="flex gap-5">
            <Link href={asLink(slice.primary.instagram)!}>
              <Instagram size={30} />
            </Link>
            <Link href={asLink(slice.primary.facebook)!}>
              <Facebook size={30} />
            </Link>
            <Link href={asLink(slice.primary.twitter)!}>
              <Twitter size={30} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
