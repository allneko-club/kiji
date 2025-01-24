import { Loader2 } from 'lucide-react';
import * as React from 'react';

export default function Loading() {
  return (
    <div>
      <Loader2 className="animate-spin" />
      Loading ...
    </div>
  );
};