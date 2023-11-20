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
  mural: {
    width: 1.0,
    height: 1.0
  }
};
const AdditionalInfo = ({ product }: { product: Product }) => {
  const findDimensions = () => {
    const tag = product.collections.nodes.find((collection) =>
      Object.keys(data).some((key) => collection.title.toLowerCase().includes(key))
    );

    if (tag) {
      const matchingKey = Object.keys(data).find((key) => tag.title.toLowerCase().includes(key))!;
      return data[matchingKey as keyof typeof data];
    }
    return null;
  };
  const dimensions = findDimensions();

  return (
    <div className="mt-4 flex flex-col gap-4">
      <p>
        {' '}
        From the{' '}
        <Link className="underline" href={`/collection/${product.collections.nodes[0]?.handle}`}>
          {' '}
          {product.collections.nodes[0]?.title}
        </Link>{' '}
        Collection
      </p>
      <p className="">
        <strong className="pr-2">Width:</strong>
        {dimensions?.width}m
      </p>
      <p>
        <strong className="pr-2">Height:</strong>
        {dimensions?.height}m
      </p>
    </div>
  );
};

export default AdditionalInfo;
