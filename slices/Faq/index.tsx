import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { asText } from '@prismicio/client';
import { PrismicRichText } from '@prismicio/react';
import { FaqSlice } from 'types.generated';
const FAQ = ({ slice }: { slice: FaqSlice }) => {
  const faqItems = slice.items.map((item, index) => {
    return (
      <AccordionItem value={index.toString()} key={index}>
        <AccordionTrigger className="text-xl">{asText(item.title)}</AccordionTrigger>
        <AccordionContent>
          <PrismicRichText field={item.text} />
        </AccordionContent>
      </AccordionItem>
    );
  });
  const faqItemsColumn1 = faqItems.slice(0, 3);
  const faqItemsColumn2 = faqItems.slice(3, 6);

  return (
    <div className="my-10">
      <h3 className="pb-5 text-center text-3xl font-semibold text-blue ">FAQs</h3>
      <Accordion type="single" collapsible className="flex w-full flex-col md:flex-row md:gap-10">
        <div className="w-full md:w-1/2 ">{faqItemsColumn1}</div>
        <div className="w-full md:w-1/2">{faqItemsColumn2} </div>
      </Accordion>
    </div>
  );
};

export default FAQ;
