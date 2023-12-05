'use client';
import { useEffect, useState } from 'react';
import { Article } from 'lib/shopify/types';
import React from 'react';
import BlogCard from 'components/cards/blog-card';
import { Loader } from 'lucide-react';
const BlogsWrapper = ({ articles }: { articles: Article[] }) => {
  const [blogs, setBlogs] = useState<Article[]>([]);

  useEffect(() => {
    setBlogs([...blogs, ...articles]);
  }, [articles]);

  return (
    <div className="grid grid-cols-1 gap-10 pt-5  md:grid-cols-3 ">
      {articles.length ? (
        !blogs.length ? (
          <div className="flex h-screen w-full items-center justify-center">
            <Loader className="animate-spin" />
          </div>
        ) : (
          blogs.map((item, index) => {
            return <BlogCard article={item} key={index} />;
          })
        )
      ) : (
        <div className=" col-span-1 flex h-[400px] h-full w-full items-center justify-center text-3xl font-semibold md:col-span-3">
          {' '}
          Empty{' '}
        </div>
      )}
    </div>
  );
};

export default BlogsWrapper;
