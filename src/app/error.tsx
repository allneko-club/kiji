'use client'
import { useEffect } from 'react'
import Typography from '@mui/material/Typography';

export default function Error({ error, reset }: {
  error: Error & { digest?: string }
  reset: () => void
}) {

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div role="alert">
      <Typography variant="h1">エラーが発生しました :(</Typography>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}