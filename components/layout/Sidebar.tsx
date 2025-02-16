import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  BookIcon,
  ComputerIcon,
  ContainerIcon,
  ExternalLinkIcon,
  GanttChartSquareIcon,
  LayersIcon,
  LayoutDashboardIcon,
  LayoutGridIcon,
  LayoutListIcon,
  LayoutPanelLeftIcon,
  ListTodoIcon,
  ListTreeIcon,
  LogInIcon,
  LogOutIcon,
  SearchIcon,
  SettingsIcon,
  SheetIcon,
  UsersIcon,
  XIcon,
} from 'lucide-react';
import { useSession } from 'next-auth/react';

import { useShowNav } from '@/context/GlobalContext';
import { cn } from '@/libs/utils';

import NavAccordion from '@/components/layout/NavAccordion';
import NavLink from '@/components/layout/NavLink';
import ThemeChanger from '@/components/layout/ThemeChanger';
import Badge from '@/components/systems/Badge';
import Modal from '@/components/systems/Modal';

export default function Sidebar({ className, ...props }: { className?: string; [props: string]: any }) {
  const router = useRouter();
  const { data: session }: { data: any } = useSession();
  const [openModal, setOpenModal] = useState(false);
  const { showNav, setShowNav } = useShowNav();

  const hideMenu = () => {
    setShowNav(false);
  };

  useEffect(() => {
    setShowNav(false);
  }, [router.pathname, setShowNav]);

  // TODO Docs https://stackoverflow.com/a/68924046
  useEffect(() => {
    if (showNav) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'visible';
  }, [showNav]);

  async function handleLogout() {
    setOpenModal(false);
    hideMenu();
    router.push('/logout');
  }

  return (
    <>
      <aside
        {...props}
        className={cn(
          'z-50 flex h-full w-screen flex-col flex-nowrap border-r dark:border-neutral-800',
          // 'bg-white dark:bg-neutral-900',
          'bg-white/80 dark:bg-neutral-900/80',
          'backdrop-blur-md backdrop-filter',
          'lg:h-screen lg:max-h-screen lg:w-60',
          showNav ? 'fixed lg:relative' : 'top-0 hidden lg:sticky lg:flex',
          className,
        )}
      >
        <div className='flex items-center justify-between gap-2 px-5'>
          <button
            className='rounded border p-0.5 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-neutral-700 dark:hover:bg-neutral-800 lg:hidden'
            onClick={hideMenu}
            id='closemenu'
            aria-label='Close Menu'
            title='Close Menu'
          >
            <XIcon className='h-5 w-5 text-neutral-500 transition-all hover:text-neutral-700 dark:text-neutral-300 dark:hover:text-neutral-100' />
          </button>
          <p className='py-2.5 text-left text-base font-semibold tracking-wide text-neutral-800 dark:text-neutral-100'>
            MyBook
          </p>
          <div className='cursor-pointer pt-1'>
            <ThemeChanger border />
          </div>
        </div>

        <div
          className={cn(
            'flex flex-col flex-nowrap gap-1 overflow-auto border-t px-4 pt-3.5 dark:border-neutral-800 lg:flex-grow',
            'scrollbar-thumb-rounded scrollbar-thin scrollbar-thumb-neutral-200 dark:scrollbar-thumb-neutral-800',
          )}
        >
          <NavLink isHome href='/dashboard' icon={<LayoutGridIcon className='h-[18px] w-[18px]' />}>
            Dashboard
          </NavLink>

          <NavLink href='/search' icon={<SearchIcon className='h-[18px] w-[18px]' />} className='mt-0.5'>
            Search
          </NavLink>

          <NavLink href='/author' icon={<UsersIcon className='h-[18px] w-[18px]' />} className='mt-0.5'>
            Author
          </NavLink>

          <NavLink href='/book' icon={<BookIcon className='h-[18px] w-[18px]' />} className='mt-0.5'>
            Book
          </NavLink>

          <NavLink href='/genre' icon={<LayoutListIcon className='h-[18px] w-[18px]' />} className='mt-0.5'>
            Genre
          </NavLink>

          <NavAccordion
            title='Activity'
            routeName='activity'
            className='mt-0.5'
            icon={<GanttChartSquareIcon className='h-[18px] w-[18px]' />}
          >
            <NavLink href='/activity' icon={<ListTreeIcon className='h-[18px] w-[18px]' />}>
              Log
            </NavLink>

            <NavLink href='/activity/session' icon={<SheetIcon className='h-[18px] w-[18px]' />} className='mt-1.5'>
              Session
            </NavLink>
          </NavAccordion>

          <NavAccordion title='Design' routeName='design' icon={<LayoutPanelLeftIcon className='h-[18px] w-[18px]' />}>
            <NavLink href='/design' icon={<LayersIcon className='h-[18px] w-[18px]' />}>
              Component
            </NavLink>
            <NavLink
              href='/design/layout'
              className='relative mt-1.5'
              icon={<LayoutDashboardIcon className='h-[18px] w-[18px]' />}
            >
              Layout
              <span className='absolute left-24 top-2.5 flex h-5 w-5 animate-bounce items-center justify-center'>
                <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75' />
                <span className='relative inline-flex h-3 w-3 rounded-full bg-sky-500' />
              </span>
            </NavLink>
            <NavLink href='/design/ui' icon={<ContainerIcon className='h-[18px] w-[18px]' />} className='mt-1.5'>
              UI
              <Badge>New</Badge>
            </NavLink>

            <NavLink href='/design/form' icon={<ListTodoIcon className='h-[18px] w-[18px]' />} className='mt-1.5'>
              Form
              <Badge>New</Badge>
            </NavLink>
            <NavLink href='/design/example' icon={<ComputerIcon className='h-[18px] w-[18px]' />} className='mt-1.5'>
              Example
              <Badge>New</Badge>
            </NavLink>
          </NavAccordion>

          <NavLink href='/setting' icon={<SettingsIcon className='h-[18px] w-[18px]' />} className='mt-0.5'>
            Setting
          </NavLink>

          <NavLink.external
            href='https://my-book-docs.vercel.app'
            icon={<ExternalLinkIcon className='h-[18px] w-[18px]' />}
            className='mt-0.5'
          >
            Docs
          </NavLink.external>
        </div>

        <hr className='mx-7 mt-2 dark:border-neutral-800 lg:mx-0' />

        <div className='px-4 py-1.5'>
          {session == null ? (
            <Link
              href='/login'
              className={cn(
                'flex w-full items-center justify-start gap-2 px-4 py-1.5 text-sm font-medium transition-all',
                'rounded text-emerald-600 hover:bg-emerald-100 dark:hover:bg-neutral-800',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500',
              )}
            >
              <LogInIcon className='mr-0.5 h-[18px] w-[18px]' />
              Login
            </Link>
          ) : (
            <button
              data-testid='button-logout'
              onClick={() => setOpenModal(true)}
              className={cn(
                'flex w-full items-center justify-start gap-2 px-4 py-1.5 text-sm font-medium transition-all',
                'rounded text-red-600 hover:bg-red-100 dark:hover:bg-neutral-800',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500',
              )}
            >
              <LogOutIcon className='mr-0.5 h-[18px] w-[18px]' />
              Logout
            </button>
          )}
        </div>
      </aside>
      <Modal
        title='Logout'
        open={openModal}
        showIcon
        isDanger
        onClose={() => setOpenModal(false)}
        onConfirm={handleLogout}
        confirmText='Logout'
        confirmTestId='confirm-logout'
      >
        Are you sure want to logout?
      </Modal>
    </>
  );
}
