import { asText } from '@prismicio/client';

const Announcment = ({ data }: { data: any }) => {
  if (!data?.announcment) return null;
  return (
    <div className="h-10 w-full bg-gold">
      <div className="text-uppercase animation-slide animation-carousel container flex h-full items-center justify-center font-semibold">
        <p className="overflow-hidden whitespace-nowrap">{asText(data.announcment)}</p>
      </div>
    </div>
  );
};

export default Announcment;
