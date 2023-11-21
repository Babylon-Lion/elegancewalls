import BlogsWrapper from 'components/blog/blogs-wrapper';
import LoadMore from 'components/blog/load-more';
import { getBlogs } from 'lib/shopify';
export const metadata = {
  title: 'Blog',
  description: 'Explore latest  wallpaper news from EleganceWalls.'
};
const BlogCollection = async ({
  searchParams
}: {
  searchParams?: { [key: string]: string | undefined };
}) => {
  const blogs = await getBlogs({
    after: searchParams?.after ? searchParams?.after : '',
    before: searchParams?.before ? searchParams?.before : ''
  });

  return (
    <div className="container min-h-screen py-8">
      <div>
        <h1 className="text-4xl font-semibold">Articles</h1>

        <BlogsWrapper articles={blogs[0]?.articles.nodes!} />

        <LoadMore pageInfo={blogs[0]?.articles.pageInfo!} />
      </div>
    </div>
  );
};

export default BlogCollection;
