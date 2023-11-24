import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
const Subscribe = () => {
  return (
    <div>
      {' '}
      <div className="mt-10 flex w-full items-center justify-center gap-2">
        <div className="flex w-full flex-col gap-2 md:w-1/2">
          <p className="text-xl font-semibold">Subscribe to our newsletter</p>

          <div className="flex items-center gap-2">
            <Input placeholder="Your email" />
            <Button className="bg-niceBlue">Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
