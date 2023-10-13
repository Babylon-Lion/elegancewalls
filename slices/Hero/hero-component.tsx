import React from 'react';
import { cn } from '@/lib/utils';

const HeroComponent = ({ data, className }: { data: any; className: string }) => {
  return <div className={cn(className)}>hero-component</div>;
};

export default HeroComponent;
