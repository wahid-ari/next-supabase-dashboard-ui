import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/Breadcrumb';

import Layout from '@/components/layouting/Layout';

export default function Started() {
  return (
    <Layout
      breadcrumb={
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className='hidden md:block'>
              <BreadcrumbLink href='#'>Application</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className='hidden md:block' />
            <BreadcrumbItem className='hidden sm:block'>
              <BreadcrumbLink href='#'>Documentation</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className='hidden sm:block' />
            <BreadcrumbItem>
              <BreadcrumbPage>Started</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      }
    >
      <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
        <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
          <div className='aspect-video rounded-xl bg-neutral-50 dark:bg-neutral-900' />
          <div className='aspect-video rounded-xl bg-neutral-50 dark:bg-neutral-900' />
          <div className='aspect-video rounded-xl bg-neutral-50 dark:bg-neutral-900' />
        </div>
        <div className='min-h-[100vh] flex-1 rounded-xl bg-neutral-50 dark:bg-neutral-900 md:min-h-min' />
      </div>
    </Layout>
  );
}
