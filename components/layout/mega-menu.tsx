import { getCollections } from 'lib/shopify';
import MegaMenuNav from './mega-menu/megamenu-nav';

const MegaMenu = async () => {
  const collections = await getCollections();

  return (
    <div className="mb-5 hidden h-14 w-full bg-gold md:block">
      <MegaMenuNav collections={collections} />
    </div>
  );
};

export default MegaMenu;
