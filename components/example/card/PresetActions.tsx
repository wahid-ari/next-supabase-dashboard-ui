'use client';

import * as React from 'react';
import { Dialog } from '@radix-ui/react-dialog';
import { MoreHorizontalIcon } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/AlertDialog';
import { Button } from '@/components/ui/Button';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Label } from '@/components/ui/Label';
import { Switch } from '@/components/ui/Switch';
import { toast } from '@/components/ui/use-toast';

export function PresetActions() {
  const [openDropdown, setOpenDropdown] = React.useState(false);
  const [open, setIsOpen] = React.useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);

  return (
    <>
      <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
        <DropdownMenuTrigger asChild>
          <Button variant='secondary' className='w-full'>
            <span className='sr-only'>Actions</span>
            <MoreHorizontalIcon className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem
            onSelect={() => {
              setIsOpen(true);
              setOpenDropdown(false);
            }}
          >
            Content filter preferences
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setShowDeleteDialog(true)} className='text-red-600 dark:text-red-600'>
            Delete preset
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={open} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Content filter preferences</DialogTitle>
            <DialogDescription>
              The content filter flags text that may violate our content policy. It&apos;s powered by our moderation
              endpoint which is free to use to moderate your OpenAI API traffic. Learn more.
            </DialogDescription>
          </DialogHeader>
          <div className='py-6'>
            <h4 className='text-sm text-neutral-600 dark:text-neutral-400'>Playground Warnings</h4>
            <div className='flex items-start justify-between space-x-4 pt-3'>
              <Switch name='show' id='show' defaultChecked={true} />
              <Label className='grid gap-1 font-normal' htmlFor='show'>
                <span className='font-semibold'>Show a warning when content is flagged</span>
                <span className='text-sm text-neutral-600 dark:text-neutral-400'>
                  A warning will be shown when sexual, hateful, violent or self-harm content is detected.
                </span>
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant='secondary' onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This preset will no longer be accessible by you or others you&apos;ve shared
              it with.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant='destructive'
              onClick={() => {
                setShowDeleteDialog(false);
                toast({
                  description: 'This preset has been deleted.',
                });
              }}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
