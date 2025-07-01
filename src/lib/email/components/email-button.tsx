import { Button } from '@react-email/components';
import React from 'react';

interface EmailButtonProps {
  label: string;
  href: string;
}

export function EmailButton({ label, href }: EmailButtonProps): React.JSX.Element {
  return <Button href={href}>{label}</Button>;
}

export default EmailButton;
