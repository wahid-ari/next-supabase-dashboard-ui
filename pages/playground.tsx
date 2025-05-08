import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/Breadcrumb';

import HeadSeo from '@/components/layout/HeadSeo';
import SectionCard from '@/components/layouting/components/SectionCards';
import Layout from '@/components/layouting/Layout';

export default function Playground() {
  return (
    <>
      <HeadSeo title='Playground' description='Playground' />
      <Layout
        breadcrumb={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className='hidden sm:block'>
                <BreadcrumbLink href='/playground'>Application</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className='hidden sm:block' />
              <BreadcrumbItem>
                <BreadcrumbPage>Playground</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
      >
        <div className='p-4'>
          <SectionCard />
          <div className='grid gap-4 md:grid-cols-3'>
            <div className='aspect-video rounded-xl bg-neutral-50 dark:bg-neutral-900' />
            <div className='aspect-video rounded-xl bg-neutral-50 dark:bg-neutral-900' />
            <div className='aspect-video rounded-xl bg-neutral-50 dark:bg-neutral-900' />
          </div>
          <div className='mt-4 min-h-[100vh] flex-1 rounded-xl bg-neutral-50 dark:bg-neutral-900' />
        </div>
      </Layout>
    </>
  );
}
