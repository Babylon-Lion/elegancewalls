import { Product } from 'lib/shopify/types';
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
  const category = product.collections.nodes.find((collection) =>
    Object.keys(data).some((key) => collection.title.toLowerCase() === key)
  );

  const findParentCollection = () => {
    let maxSpacesObject = { title: '', handle: '' };

    product.collections.nodes.forEach((item) => {
      const spacesCount = item.title.split(' ').length - 1;

      if (spacesCount) {
        maxSpacesObject = item;
      }
      //in case title has no spaces in it
    });

    if (!maxSpacesObject) {
      maxSpacesObject = product.collections.nodes.find(
        (item) => item.title != category?.title && item.title != 'Residential'
      )!;
    }
    return maxSpacesObject;
  };

  const findDimensions = () => {
    if (category) {
      const matchingKey = Object.keys(data).find((key) =>
        category.title.toLowerCase().includes(key)
      )!;
      return data[matchingKey as keyof typeof data];
    }
    return null;
  };

  const metersToFeet = (meters: number) => (meters * 3.28084).toFixed(1);
  const parentCollection = findParentCollection();

  const dimensions = findDimensions();
  const widthInFeet = dimensions?.width ? metersToFeet(dimensions.width) : null;
  const heightInFeet = dimensions?.height ? metersToFeet(dimensions.height) : null;
  return (
    <div className="mt-4 flex flex-col gap-4">
      <p>
        {' '}
        From the{' '}
        <Link
          className="underline"
          href={`/search/${
            parentCollection
              ? parentCollection?.handle
              : product.collections.nodes.find((item) => item.title.toLowerCase() != 'residential')
                  ?.handle
          }`}
        >
          {' '}
          {parentCollection?.title
            ? parentCollection?.title
            : product.collections.nodes.find((item) => item.title.toLowerCase() != 'residential')
                ?.title}
        </Link>{' '}
        Collection
      </p>

      {category && (
        <p>
          {' '}
          <strong className="pr-2">Category:</strong>
          {category?.title}
        </p>
      )}

      {dimensions?.width && (
        <>
          <p className="">
            <strong className="pr-2">Width:</strong>
            {dimensions?.width}m {`(${widthInFeet}ft)`}
          </p>

          <p>
            <strong className="pr-2">Height:</strong>
            {dimensions?.height}m {`(${heightInFeet}ft)`}
          </p>
        </>
      )}
    </div>
  );
};

export default AdditionalInfo;
