import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';

export default function SectionCards() {
  return (
    <div className='grid grid-cols-1 gap-4 pb-4 sm:grid-cols-2 xl:grid-cols-4'>
      <Card>
        <CardHeader className='relative p-4'>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums'>$1,250.00</CardTitle>
          <div className='absolute right-4 top-4'>
            <Badge variant='outline' className='flex gap-1 rounded-lg text-xs'>
              <TrendingUpIcon className='size-3' />
              +12.5%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1 p-4 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Trending up this month <TrendingUpIcon className='size-4' />
          </div>
          <div className='text-neutral-500'>Visitors for the last 6 months</div>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader className='relative p-4'>
          <CardDescription>New Customers</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums'>1,234</CardTitle>
          <div className='absolute right-4 top-4'>
            <Badge variant='outline' className='flex gap-1 rounded-lg text-xs'>
              <TrendingDownIcon className='size-3' />
              -20%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1 p-4 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Down 20% this period <TrendingDownIcon className='size-4' />
          </div>
          <div className='text-neutral-500'>Acquisition needs attention</div>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader className='relative p-4'>
          <CardDescription>Active Accounts</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums'>45,678</CardTitle>
          <div className='absolute right-4 top-4'>
            <Badge variant='outline' className='flex gap-1 rounded-lg text-xs'>
              <TrendingUpIcon className='size-3' />
              +12.5%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1 p-4 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Strong user retention <TrendingUpIcon className='size-4' />
          </div>
          <div className='text-neutral-500'>Engagement exceed targets</div>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader className='relative p-4'>
          <CardDescription>Growth Rate</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums'>4.5%</CardTitle>
          <div className='absolute right-4 top-4'>
            <Badge variant='outline' className='flex gap-1 rounded-lg text-xs'>
              <TrendingUpIcon className='size-3' />
              +4.5%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1 p-4 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Steady performance <TrendingUpIcon className='size-4' />
          </div>
          <div className='text-neutral-500'>Meets growth projections</div>
        </CardFooter>
      </Card>
    </div>
  );
}
