'use client';
import { Button } from '@/components/ui/button';
import { createUrl } from 'lib/utils';
import { usePathname, useRouter } from 'next/navigation';

const LoadMore = ({
  pageInfo
}: {
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string;
    startCursor: string;
    hasPreviousPage: boolean;
  };
}) => {
  console.log(pageInfo);
  const path = usePathname();
  const newParams = new URLSearchParams();
  const router = useRouter();

  const handlePagination = () => {
    newParams.set('after', pageInfo.endCursor);

    router.push(createUrl(path, newParams), { scroll: false });
  };

  return (
    <div className="justify">
      <div className="flex w-full justify-center gap-5">
        <Button disabled={!pageInfo.hasNextPage} onClick={() => handlePagination()}>
          Load More
        </Button>
      </div>
    </div>
  );
};

export default LoadMore;
