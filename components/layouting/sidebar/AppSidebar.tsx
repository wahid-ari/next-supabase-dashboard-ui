'use client';

import * as React from 'react';
import {
  BookOpen,
  Command,
  Frame,
  GalleryVerticalEnd,
  LifeBuoyIcon,
  PieChart,
  SendIcon,
  Settings2,
} from 'lucide-react';
import { useTheme } from 'next-themes';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/Sidebar';

import { NavMain } from '@/components/layouting/sidebar/NavMain';
import { NavProjects } from '@/components/layouting/sidebar/NavProjects';
import { NavUser } from '@/components/layouting/sidebar/NavUser';
import { TeamSwitcher } from '@/components/layouting/sidebar/TeamSwitcher';
import ThemeToggle from '@/components/layouting/sidebar/ThemeToggle';

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Playground',
      icon: Command,
      route: '/playground',
      isActive: true,
      items: [
        {
          title: 'History',
          url: '/playground',
        },
        {
          title: 'Starred',
          url: '#',
        },
      ],
    },
    {
      title: 'Documentation',
      icon: BookOpen,
      route: '/documentation',
      isActive: false,
      items: [
        {
          title: 'Introduction',
          url: '/documentation',
        },
        {
          title: 'Started',
          url: '/documentation/started',
        },
      ],
    },
    {
      title: 'Settings',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Team',
          url: '#',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '/playground',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '/documentation/started',
      icon: PieChart,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { theme } = useTheme();
  const { state } = useSidebar();

  return (
    <Sidebar collapsible='icon' {...props} className='dark:border-r-neutral-700'>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className='scrollbar-thin'>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        {state == 'collapsed' ? (
          <div className='flex items-center justify-center'>
            <SidebarMenuButton tooltip={`Change to ${theme == 'light' ? 'Dark' : 'Light'}`}>
              <ThemeToggle>{''}</ThemeToggle>
            </SidebarMenuButton>
          </div>
        ) : (
          <ThemeToggle className='mx-2 flex cursor-pointer gap-2 rounded p-1.5 text-sm transition-all hover:bg-neutral-100 dark:hover:bg-neutral-800'>
            Change to {theme == 'light' ? 'Dark' : 'Light'}
          </ThemeToggle>
        )}
        <SidebarGroup className='mt-auto'>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild size='sm'>
                  <a href='#'>
                    <SendIcon />
                    <span>Feedback</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
