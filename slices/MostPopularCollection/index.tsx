import { getCollectionProducts } from 'lib/shopify';
import Slider from 'slices/ShowcaseCollection/slider';
import { MostPopularCollectionSlice } from 'types.generated';
import { asText } from '@prismicio/client';

const MostPopularCollection = async ({ slice }: { slice: MostPopularCollectionSlice }) => {
  const products = await getCollectionProducts({
    collection: asText(slice?.primary?.shopifycollectionhandle)
  });

  return (
    <Slider
      productData={products}
      title={slice.primary.title}
      handle={asText(slice?.primary.shopifycollectionhandle)}
    />
  );
};

export default MostPopularCollection;
