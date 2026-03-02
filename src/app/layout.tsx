import type { Metadata } from 'next'
import { ColorSchemeScript } from '@mantine/core'
import { Providers } from '@/shared/components/providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'Timera',
  description: 'Time tracking for teams',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
