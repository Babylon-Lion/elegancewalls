import BlogCard from 'components/cards/blog-card';
import { getBlogs } from 'lib/shopify';

export const metadata = {
  title: 'Blog',
  description: 'Explore latest  wallpaper news from EleganceWalls.'
};
const BlogCollection = async () => {
  const blogs = await getBlogs({ after: '' });

  return (
    <div className="container min-h-screen py-8">
      <div>
        <h1 className="text-4xl font-semibold">Articles</h1>

        <div className="grid grid-cols-1 pt-5 md:grid-cols-3 ">
          {blogs.length ? (
            blogs.map((item, index) => {
              return (
                <BlogCard article={item.articles.nodes[0]!} handle={item.handle} key={index} />
              );
            })
          ) : (
            <div className=" col-span-1 flex h-[400px] h-full w-full items-center justify-center text-3xl font-semibold md:col-span-3">
              {' '}
              Empty{' '}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogCollection;
