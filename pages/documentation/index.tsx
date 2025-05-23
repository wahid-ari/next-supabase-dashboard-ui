import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/Breadcrumb';

import HeadSeo from '@/components/layout/HeadSeo';
import Layout from '@/components/layouting/Layout';

export default function Documentation() {
  return (
    <>
      <HeadSeo title='Documentation' description='Documentation' />
      <Layout
        breadcrumb={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className='hidden sm:block'>
                <BreadcrumbLink href='/playground'>Application</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className='hidden sm:block' />
              <BreadcrumbItem>
                <BreadcrumbPage>Documentation</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
      >
        <div className='flex flex-1 flex-col gap-4 p-4'>
          <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
            <div className='aspect-video rounded-xl bg-neutral-50 dark:bg-neutral-900' />
            <div className='aspect-video rounded-xl bg-neutral-50 dark:bg-neutral-900' />
            <div className='aspect-video rounded-xl bg-neutral-50 dark:bg-neutral-900' />
          </div>
          <div className='min-h-[100vh] flex-1 rounded-xl bg-neutral-50 dark:bg-neutral-900 md:min-h-min' />
        </div>
      </Layout>
    </>
  );
}
