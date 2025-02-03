'use client'
import { Button } from '@/components/ui/button';

export const ScrollToTop = () => {
  const onScrollToTop = () => window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  // todo 現在のy座標に応じてボタンの表示を切り替えたい
  return (
    <Button
      onClick={onScrollToTop}
      className="!fixed bottom-5 end-5 rounded-full bg-slate-400 p-3 uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-slate-500 focus:bg-slate-500"
    >
      Top
    </Button>
  )
}
