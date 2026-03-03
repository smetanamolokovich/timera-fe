'use client'

import { Group, Text, Avatar, Menu, UnstyledButton } from '@mantine/core'
import { IconChevronDown, IconLogout, IconSettings } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/features/auth/store'
import { useMe } from '@/features/auth/hooks'
import { useState } from 'react'
import cx from 'clsx'
import classes from './header.module.css'

export function Header() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const clearAuth = useAuthStore((s) => s.clearAuth)
  const { data: me } = useMe()

  console.log('me', me)

  const [userMenuOpened, setUserMenuOpened] = useState(false)

  const logout = () => {
    clearAuth()
    document.cookie = 'timera-auth-token=; path=/; max-age=0'
    queryClient.clear()
    router.push('/login')
  }

  return (
    <Group h="100%" px="md" justify="flex-end">
      <Menu
        width={260}
        position="bottom-end"
        transitionProps={{ transition: 'pop-top-right' }}
        onClose={() => setUserMenuOpened(false)}
        onOpen={() => setUserMenuOpened(true)}
        withinPortal
      >
        <Menu.Target>
          <UnstyledButton
            className={cx(classes.user, {
              [classes.userActive]: userMenuOpened,
            })}
          >
            <Group gap={7}>
              <Avatar
                src={me?.avatarUrl}
                alt={`${me?.firstName} ${me?.lastName}`}
                radius="xl"
                size={25}
              />
              <Text fw={500} size="sm" lh={1} mr={3}>
                {me?.firstName} {me?.lastName}
              </Text>
              <IconChevronDown size={12} stroke={1.5} />
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Profile</Menu.Label>
          <Menu.Item leftSection={<IconSettings size={16} stroke={1.5} />}>
            Account settings
          </Menu.Item>
          <Menu.Item
            leftSection={<IconLogout size={16} stroke={1.5} />}
            onClick={logout}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  )
}
