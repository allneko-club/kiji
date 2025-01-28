/**
 * server actionsで使うためのフォーム用コンポーネント
 */
import { ReactNode } from 'react';
import * as React from 'react';
import { cn } from '@/lib/utils';

function FormItem({ children }: { children: ReactNode }) {
  return (
    <div className="grid items-center gap-1.5">
      {children}
    </div>
  );
}

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {

  if(!children){
    return null
  }

  return (
    <p
      ref={ref}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {children}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export {
  FormItem,
  FormMessage,
}