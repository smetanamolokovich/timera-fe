'use client'

import { useState } from 'react'
import {
  IconChartBar,
  IconClock,
  IconFolder,
  IconHome2,
  IconMail,
  IconSettings,
  IconUsers,
} from '@tabler/icons-react'
import { Center, Stack, Tooltip, UnstyledButton } from '@mantine/core'
import classes from './sidebar.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavbarLinkProps {
  icon: typeof IconHome2
  label: string
  active?: boolean
  onClick?: () => void
  href?: string
}

function NavbarLink({
  icon: Icon,
  label,
  active,
  onClick,
  href,
}: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        component={Link}
        href={href || '#'}
        onClick={onClick}
        className={classes.link}
        data-active={active || undefined}
        aria-label={label}
      >
        <Icon size={20} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  )
}

const linksList = [
  { href: '/projects', label: 'Projects', icon: IconFolder },
  { href: '/time-entries', label: 'Time entries', icon: IconClock },
  { href: '/employees', label: 'Employees', icon: IconUsers },
  { href: '/reports', label: 'Reports', icon: IconChartBar },
  { href: '/invitations', label: 'Invitations', icon: IconMail },
]

export function Sidebar() {
  const pathname = usePathname()

  const links = linksList.map((link) => (
    <NavbarLink {...link} key={link.label} active={pathname === link.href} />
  ))

  return (
    <Stack h="100%" justify="space-between" py="md">
      <Stack gap={0} align="center">
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </Stack>

      <Center>
        <Stack justify="center" gap={0}>
          <NavbarLink icon={IconSettings} label="Settings" href="/settings" />
        </Stack>
      </Center>
    </Stack>
  )
}
