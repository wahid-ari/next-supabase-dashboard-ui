'use client';

import * as React from 'react';
import {
  BookOpen,
  Command,
  Frame,
  GalleryVerticalEnd,
  LifeBuoyIcon,
  Map,
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
  // TODO open sidebar collapsible menu when link matched
  navMain: [
    {
      title: 'Playground',
      icon: Command,
      isActive: true,
      items: [
        {
          title: 'History',
          url: '/dashboardd',
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
      isActive: false,
      items: [
        {
          title: 'Introduction',
          url: '/dashboarddd',
        },
        {
          title: 'Get Started',
          url: '#',
        },
      ],
    },
    {
      title: 'Settings',
      icon: Settings2,
      isActive: false,
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
      url: '/dashboardd',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
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
      <SidebarContent className='scrollbar-thin scrollbar-track-neutral-100 scrollbar-thumb-neutral-200 dark:scrollbar-track-neutral-800 dark:scrollbar-thumb-neutral-700'>
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
                    <LifeBuoyIcon />
                    <span>Support</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
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
