import { MoonIcon, SunIcon, SunMoonIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { cn } from '@/libs/utils';
import { useMounted } from '@/hooks/use-mounted';

export default function FrontThemeChanger({ variant = 'icon', ...props }: { variant?: string; [props: string]: any }) {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return (
      <button
        className={cn(
          'rounded-md border hover:border-neutral-300 dark:border-neutral-700 dark:hover:border-neutral-600',
          'focus:outline-none focus:ring-2 focus:ring-sky-500',
          'inline-flex items-center justify-center overflow-hidden transition-all duration-200',
          variant === 'icon' && 'p-1',
          variant === 'labelled' && 'px-2 py-1',
        )}
      >
        <SunMoonIcon className='h-5 w-5 text-neutral-700 dark:text-neutral-200' />
      </button>
    );
  }

  return (
    <button
      {...props}
      title='Change Theme'
      aria-label='Change Theme'
      onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}
      className={cn(
        'rounded-md border hover:border-neutral-300 dark:border-neutral-700 dark:hover:border-neutral-600',
        'hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:hover:bg-neutral-800',
        'inline-flex items-center justify-center overflow-hidden transition-all duration-200',
        variant === 'icon' && 'p-1',
        variant === 'labelled' && 'px-2 py-1',
      )}
    >
      {/* note that the duration is longer then the one on body, controlling the bg-color */}
      <div className='relative h-5 w-5'>
        <span
          className='absolute inset-0 flex rotate-90 transform items-center justify-center text-neutral-700 transition duration-500 motion-reduce:duration-0 dark:rotate-0 dark:text-neutral-200'
          style={{ transformOrigin: '50% 100px' }}
        >
          <MoonIcon className='h-[19px] w-[19px]' />
        </span>
        <span
          className='absolute inset-0 flex rotate-0 transform items-center justify-center text-neutral-700 transition duration-500 motion-reduce:duration-0 dark:-rotate-90 dark:text-neutral-200'
          style={{ transformOrigin: '50% 100px' }}
        >
          <SunIcon className='h-[19px] w-[19px]' />
        </span>
      </div>
      <span className={cn('ml-1 text-sm text-neutral-700 dark:text-neutral-200', variant === 'icon' && 'sr-only')}>
        {theme == 'dark' ? 'Light' : 'Dark'}
      </span>
    </button>
  );
}
