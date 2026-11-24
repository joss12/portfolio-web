import type { ReactNode } from 'react';

interface BootWrapperProps {
  children: ReactNode;
}

export default function BootWrapper({
  children,
}: BootWrapperProps) {
  return <>{children}</>;
}
