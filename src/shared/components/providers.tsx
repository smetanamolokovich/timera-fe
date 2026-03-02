'use client'

import { useState } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { makeQueryClient } from '@/shared/lib/query-client'
import { theme } from '@/shared/lib/theme'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => makeQueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme} defaultColorScheme="light">
        <Notifications position="top-right" zIndex={1000} />
        {children}
      </MantineProvider>
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  )
}
