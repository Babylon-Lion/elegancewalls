import { getCollectionProducts } from 'lib/shopify';
import { ShowcaseCollectionnSlice } from 'types.generated';
import Slider from './slider';
import { asText } from '@prismicio/client';
const ShowcaseCollection = async ({ slice }: { slice: ShowcaseCollectionnSlice }) => {
  const data = await Promise.all(
    slice.items.map((item) => {
      //@ts-ignore
      return getCollectionProducts({ collection: asText(item?.collectionhandle) });
    })
  );

  const displayOnSlider = data.map((item, index) => {
    //@ts-ignore
    return (
      <Slider
        productData={item}
        title={slice.items[index]?.title}
        handle={asText(slice?.items[index]?.collectionhandle)}
        key={index}
      />
    );
  });

  return <> {displayOnSlider}</>;
};

export default ShowcaseCollection;
