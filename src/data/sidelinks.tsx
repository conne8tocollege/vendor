import {
  IconLayoutDashboard,
  IconRouteAltLeft,
  IconSettings,
  IconWebhook,
  IconUsersGroup,
} from '@tabler/icons-react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: 'Leads',
    label: '10',
    href: '/requests',
    icon: <IconRouteAltLeft size={18} />,
    sub: [
      {
        title: 'Add Leads',
        label: '9',
        href: '/add/leads',
        icon: <IconUsersGroup size={18} />,
      },
      {
        title: 'Sent Leads',
        label: '1',
        href: '/sent/leads',
        icon: <IconWebhook size={18} />,
      },
    ],
  },
  {
    title: 'Settings',
    label: '',
    href: '/settings',
    icon: <IconSettings size={18} />,
  },
]
