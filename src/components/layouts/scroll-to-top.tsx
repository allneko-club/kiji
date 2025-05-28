'use client'
import * as React from 'react';
import Button from '@mui/material/Button';

export const ScrollToTop = () => {
  const onScrollToTop = () => window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  // todo 現在のy座標に応じてボタンの表示を切り替えたい
  return (
    <Button variant="contained" onClick={onScrollToTop}>Top</Button>
  )
}
