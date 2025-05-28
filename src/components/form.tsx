/**
 * server actionsで使うためのフォーム用コンポーネント
 */
import * as React from 'react';

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={className} {...props} />
})
FormItem.displayName = "FormItem"

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
      className={className}
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