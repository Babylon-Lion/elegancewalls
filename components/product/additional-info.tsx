import { Product } from 'lib/shopify/types';
import React from 'react';
import Link from 'next/link';

const data = {
  hexa: {
    width: 1.06,
    height: 15.6
  },
  quad: {
    width: 1.06,
    height: 10.0
  },
  murals: {
    width: 1.0,
    height: 1.0
  }
};
const AdditionalInfo = ({ product }: { product: Product }) => {
  const collection = product.collections.nodes.find((collection) =>
    Object.keys(data).some((key) => collection.title.toLowerCase() === key)
  );

  const findDimensions = () => {
    if (collection) {
      const matchingKey = Object.keys(data).find((key) =>
        collection.title.toLowerCase().includes(key)
      )!;
      return data[matchingKey as keyof typeof data];
    }
    return null;
  };

  const metersToFeet = (meters: number) => (meters * 3.28084).toFixed(1);

  const dimensions = findDimensions();
  const widthInFeet = dimensions?.width ? metersToFeet(dimensions.width) : null;
  const heightInFeet = dimensions?.height ? metersToFeet(dimensions.height) : null;
  return (
    <div className="mt-4 flex flex-col gap-4">
      <p>
        {' '}
        From the{' '}
        <Link className="underline" href={`/search/${collection?.handle}`}>
          {' '}
          {collection?.title}
        </Link>{' '}
        Collection
      </p>
      <p className="">
        <strong className="pr-2">Width:</strong>
        {dimensions?.width}m {`(${widthInFeet}ft)`}
      </p>
      <p>
        <strong className="pr-2">Height:</strong>
        {dimensions?.height}m {`(${heightInFeet}ft)`}
      </p>
    </div>
  );
};

export default AdditionalInfo;
