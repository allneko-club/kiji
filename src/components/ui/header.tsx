import { cn } from '@/lib/utils';

export const H1 = ({children, className}) => {
  return (
      <h1 className={cn("text-2xl", className)}>
        {children}
      </h1>
  );
};
