import { Button } from '@/components/ui/button';
import { ListItem } from '@/components/ui/navigation-menu';
import { Blog } from 'lib/shopify/types';
import Link from 'next/link';
export const wallpaperStyles = [
  {
    title: 'Abstract',
    url: 'https://res.cloudinary.com/dw3tmehnz/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1696882317/qa5hh3hwtq1wslobq1su.jpg?_s=public-apps'
  },
  {
    title: 'Animal',
    url: 'https://res.cloudinary.com/dw3tmehnz/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1696882318/s603jf5wvjbwy7ckyjpk.jpg?_s=public-apps'
  },
  {
    title: 'Black & White',
    url: 'https://res.cloudinary.com/dw3tmehnz/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1696882318/sy0twnmhdcw7wmnujfgt.jpg?_s=public-apps'
  },
  {
    title: 'Concrete',
    url: 'https://res.cloudinary.com/dw3tmehnz/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1696882317/gnhg2191qlhkzogleiuw.jpg?_s=public-apps'
  },
  {
    title: 'Damask',
    url: 'https://res.cloudinary.com/dw3tmehnz/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1696882317/jzdwrhjtk39xkdba1zln.jpg?_s=public-apps'
  },
  {
    title: 'Floral',
    url: 'https://res.cloudinary.com/dw3tmehnz/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1696882318/jgscpbevhp3tzahlj0ak.jpg?_s=public-apps'
  },
  {
    title: 'Geometric',
    url: 'https://res.cloudinary.com/dw3tmehnz/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1696882318/jjag1rhrthmnjfg6sz8d.jpg?_s=public-apps'
  }
];

// const instaPosts = [{
//     link: "",
//     image:"",
// }]

const BlogNav = ({ blogs, mobile }: { blogs: Blog[]; mobile?: boolean }) => {
  return (
    <div className="div flex  h-auto w-[400px] p-4  md:w-[800px] xl:w-[900px]  ">
      {!mobile && (
        <div className="flex w-1/3 flex-col gap-2 pr-5">
          <h3 className="text-md col-span-1 font-semibold ">How to</h3>

          {wallpaperStyles.slice(0, 4).map((component, index) => (
            <Link href={`/search?color=${component.title.replace(' ', '-')}`} key={index}>
              <ListItem key={index} title={component.title} src={component.url}></ListItem>
            </Link>
          ))}
        </div>
      )}
      <div className=" flex w-full flex-col  gap-2  md:w-2/3  ">
        <h3 className="text-md col-span-1 font-semibold ">Articles</h3>
        <div className="flex w-full  gap-3">
          {blogs.length
            ? blogs.slice(0, 4).map((blog, index) => (
                <div
                  key={index}
                  className="flex max-h-[400px] w-full flex-col gap-2 overflow-hidden  rounded-md bg-accent p-3 text-sm font-semibold md:w-1/2"
                >
                  <Link
                    href={`/blog/${blog.handle}`}
                    className="flex justify-between rounded-full p-1 px-2 hover:bg-slate-600 hover:text-white"
                  >
                    {blog.articles.nodes[0]?.title}
                    <div className={`h-5 w-5 rounded-full `}></div>
                  </Link>
                </div>
              ))
            : null}
          <div></div>
        </div>

        <div className="flex w-full justify-center md:block md:w-auto ">
          <Link href={'/blog'}>
            {' '}
            <Button className="border-2  border-black font-semibold md:w-1/2" variant={'ghost'}>
              {' '}
              View More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogNav;
