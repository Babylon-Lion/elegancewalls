'use client';
import { Article } from 'lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
const BlogCard = ({ article }: { article: Article }) => {
  const id = article.id.replace('gid://shopify/Article/', '');

  return (
    <div className="col-span-1 h-[400px]">
      <div className="relative h-2/3 w-full">
        <Link href={`/blog/${id}`}>
          {' '}
          {article?.image?.url ? (
            <Image
              fill
              src={article.image.url}
              className="absolute object-cover"
              alt={article.image.altText!}
            />
          ) : (
            <Skeleton className="h-full w-full" />
          )}
        </Link>
      </div>
      <div className="flex flex-col pt-4">
        <Link href={`/blog/${id}`}>
          <h4 className="text-2xl font-semibold">{article.title}</h4>
        </Link>

        <Link href={`/blog/${id}`} className="pt-3 ">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
