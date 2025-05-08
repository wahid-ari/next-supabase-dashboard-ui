import { ReactNode } from 'react';

import { cn } from '@/libs/utils';

import { Separator } from '@/components/ui/Separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/Sidebar';

import { AppSidebar } from '@/components/layouting/sidebar/AppSidebar';

export default function Layout({ children, breadcrumb }: { children: ReactNode; breadcrumb?: any }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header
          className={cn(
            'sticky z-10 top-0 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12',
            'border-b border-b-neutral-200 bg-neutral-50 dark:border-b-neutral-800 dark:bg-neutral-900',
          )}
        >
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1' />
            <Separator orientation='vertical' className='mr-2 h-4' />
            {breadcrumb}
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
