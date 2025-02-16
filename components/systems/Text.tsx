import { ReactNode } from 'react';

import { cn } from '@/libs/utils';

type Props = {
  children: ReactNode;
  className?: string;
  [props: string]: any;
};

export default function Text({ children, className, ...props }: Props) {
  return (
    <p {...props} className={cn('text-sm text-neutral-700 dark:text-neutral-200', className)}>
      {children}
    </p>
  );
}

Text.light = ({ children, className, ...props }: Props) => {
  return (
    <p {...props} className={cn('text-sm font-light text-neutral-700 dark:text-neutral-200', className)}>
      {children}
    </p>
  );
};

Text.medium = ({ children, className, ...props }: Props) => {
  return (
    <p {...props} className={cn('text-sm font-medium text-neutral-700 dark:text-neutral-200', className)}>
      {children}
    </p>
  );
};

Text.semibold = ({ children, className, ...props }: Props) => {
  return (
    <p {...props} className={cn('text-sm font-semibold text-neutral-700 dark:text-neutral-200', className)}>
      {children}
    </p>
  );
};

Text.bold = ({ children, className, ...props }: Props) => {
  return (
    <p {...props} className={cn('text-sm font-bold text-neutral-700 dark:text-neutral-200', className)}>
      {children}
    </p>
  );
};

Text.extrabold = ({ children, className, ...props }: Props) => {
  return (
    <p {...props} className={cn('text-sm font-extrabold text-neutral-700 dark:text-neutral-200', className)}>
      {children}
    </p>
  );
};
