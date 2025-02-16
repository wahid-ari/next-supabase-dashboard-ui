import { ChevronDownIcon } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/Command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';

export function DemoTeamMembers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
        <CardDescription>Invite your team members to collaborate.</CardDescription>
      </CardHeader>
      <CardContent className='grid gap-6'>
        <div className='flex items-center justify-between space-x-4'>
          <div className='flex items-center sm:space-x-4'>
            <Avatar className='hidden sm:block'>
              <AvatarImage src='https://github.com/vercel.png' />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div>
              <p className='text-sm font-medium leading-none'>Sofia Davis</p>
              <p className='text-sm text-neutral-500 dark:text-neutral-400'>m@example.com</p>
            </div>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant='outline' className='ml-auto'>
                Viewer <ChevronDownIcon className='ml-2 h-4 w-4 text-neutral-500 dark:text-neutral-400' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='p-0' align='end'>
              <Command>
                <CommandInput placeholder='Select new role...' />
                <CommandList>
                  <CommandEmpty>No roles found.</CommandEmpty>
                  <CommandGroup>
                    <CommandItem className='teamaspace-y-1 flex flex-col items-start px-4 py-2'>
                      <p>Viewer</p>
                      <p className='text-sm text-neutral-500 dark:text-neutral-400'>Can view and comment.</p>
                    </CommandItem>
                    <CommandItem className='teamaspace-y-1 flex flex-col items-start px-4 py-2'>
                      <p>Developer</p>
                      <p className='text-sm text-neutral-500 dark:text-neutral-400'>Can view, comment and edit.</p>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className='flex items-center justify-between space-x-4'>
          <div className='flex items-center sm:space-x-4'>
            <Avatar className='hidden sm:block'>
              <AvatarImage src='https://github.com/vercel.png' />
              <AvatarFallback>JL</AvatarFallback>
            </Avatar>
            <div>
              <p className='text-sm font-medium leading-none'>Jackson Lee</p>
              <p className='text-sm text-neutral-500 dark:text-neutral-400'>p@example.com</p>
            </div>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant='outline' className='ml-auto'>
                Billing <ChevronDownIcon className='ml-2 h-4 w-4 text-neutral-500 dark:text-neutral-400' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='p-0' align='end'>
              <Command>
                <CommandInput placeholder='Select new role...' />
                <CommandList>
                  <CommandEmpty>No roles found.</CommandEmpty>
                  <CommandGroup className='p-1.5'>
                    <CommandItem className='teamaspace-y-1 flex flex-col items-start px-4 py-2'>
                      <p>Billing</p>
                      <p className='text-sm text-neutral-500 dark:text-neutral-400'>
                        Can view, comment and manage billing.
                      </p>
                    </CommandItem>
                    <CommandItem className='teamaspace-y-1 flex flex-col items-start px-4 py-2'>
                      <p>Owner</p>
                      <p className='text-sm text-neutral-500 dark:text-neutral-400'>
                        Admin-level access to all resources.
                      </p>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  );
}
