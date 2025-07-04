import { paths } from '@/lib/paths';
import { Link, Text } from '@react-email/components';
import React from 'react';

export function EmailFooter(): React.JSX.Element {
  return (
    <Text>
      Kiji
      <br />
      URL: <Link href={paths.home.getHref()} target="_blank" />
    </Text>
  );
}

export default EmailFooter;
