import { getCollections, getBlogs } from 'lib/shopify';
import MegaMenuNav from './mega-menu/megamenu-nav';

const MegaMenu = async () => {
  const collections = await getCollections();
  const blogs = await getBlogs({ after: '' });

  return (
    <div className="mb-5 hidden h-14 w-full bg-slate-900 md:block">
      <MegaMenuNav collections={collections} blogs={blogs} />
    </div>
  );
};

export default MegaMenu;
