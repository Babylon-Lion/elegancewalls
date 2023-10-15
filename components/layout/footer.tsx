import Link from 'next/link';

import { PrismicRichText } from '@prismicio/react';
import { createClient } from 'prismicio';
import { asText } from '@prismicio/client';

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();

  const client = createClient();
  const footer = await client.getByType('footer');

  const footerData = footer.results[0]?.data;

  const footerMenus = footerData?.slices.map((item, index) => {
    return (
      <div className="col-span-1" key={index}>
        <h3 className="mb-2 text-2xl font-semibold">
          <PrismicRichText field={item.primary.header} />
        </h3>
        <ul>
          {item.items.map((sliceItem, index) => {
            return (
              <Link href={sliceItem.listitemlink.url!} key={index}>
                {' '}
                <li className="cursor-pointer font-semibold hover:underline">
                  <PrismicRichText field={sliceItem.listitem} />
                </li>
              </Link>
            );
          })}

          <li></li>
        </ul>
      </div>
    );
  });

  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');

  const copyrightName = COMPANY_NAME || SITE_NAME || '';

  return (
    <footer className="  h-[300px]  w-full  border-t-2 border-gold ">
      <div className="grid-rows-auto container grid grid-cols-2 gap-10 py-10 md:grid-cols-4 md:gap-20">
        {footerMenus}
        <div className="col-span-1">
          <h3 className="mb-2 text-2xl font-semibold">Office</h3>
          <ul>
            <li className="cursor-pointer font-semibold hover:underline">
              <a href={`mailto:${asText(footerData?.email)}`}>{asText(footerData?.email)}</a>
            </li>
            <li className="cursor-pointer font-semibold hover:underline">
              PH:{' '}
              <a href={`tel:${asText(footerData?.phonenumber)}`}>
                {asText(footerData?.phonenumber)}
              </a>
            </li>
            <li className="cursor-pointer font-semibold hover:underline">
              {asText(footerData?.address)}
            </li>
            <li></li>
          </ul>
        </div>
      </div>

      <div className="w-full border-t border-neutral-200 py-6 text-sm dark:border-neutral-700">
        <div className="mx-auto flex  w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
          <p>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
