import { Skeleton } from '@/components/ui/skeleton';
import Subscribe from 'components/subscribe';
import { getBlog } from 'lib/shopify';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params
}: {
  params: { handle: string };
}): Promise<Metadata> {
  const blog = await getBlog({ handle: params.handle });

  if (!blog) return notFound();

  const article = blog.articles.nodes[0];

  const { url, width, height, altText: alt } = article?.image || {};

  return {
    title: article?.seo.title || article?.title,
    description: article?.seo?.description || article?.content,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true
      }
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt
            }
          ]
        }
      : null
  };
}

const BlogPage = async ({ params }: { params: { handle: string } }) => {
  const blog = await getBlog({ handle: params.handle });

  const article = blog.articles.nodes[0];

  return (
    <div className="container min-h-screen py-8">
      <div>
        <h1 className="text-center text-4xl font-semibold">{article?.title}</h1>
        <p className="pt-2 text-center">{article?.publishedAt.split('T')[0]}</p>
      </div>
      <div className="relative h-[400px] w-full pt-5">
        {article?.image?.url ? (
          <Image
            fill
            alt={article.image.altText!}
            src={article?.image.url}
            className="object-cover"
          />
        ) : (
          <Skeleton className="h-full w-full" />
        )}
      </div>
      <div className="blog pt-5" dangerouslySetInnerHTML={{ __html: article?.contentHtml! }}></div>

      <Subscribe />
    </div>
  );
};

export default BlogPage;
