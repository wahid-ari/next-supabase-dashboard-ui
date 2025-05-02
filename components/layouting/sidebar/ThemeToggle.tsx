import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { cn } from '@/libs/utils';
import { useMounted } from '@/hooks/use-mounted';

export default function ThemeToggle({
  children,
  className,
  border,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  border?: boolean;
  [props: string]: any;
}) {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  if (!mounted) return null;

  return (
    <button
      {...props}
      onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}
      aria-label='Toggle Theme'
      title='Toggle Theme'
      className={cn(
        'group rounded transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
        border && 'border p-0.5 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800',
        'text-neutral-700 hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-100',
        className,
      )}
    >
      {theme == 'dark' ? <SunIcon className='size-[18px]' /> : <MoonIcon className='size-[19px]' />}
      {children}
    </button>
  );
}
