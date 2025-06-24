'use client';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error(error.message);
    }
  }, [error]);

  return (
    <html>
      <body>
        <Typography variant="h1">エラーが発生しました :(</Typography>
        <Button variant="outlined" onClick={() => reset()}>
          Try again
        </Button>
      </body>
    </html>
  );
}
