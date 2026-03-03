import { AppShellLayout } from '@/shared/components/layouts/AppShellLayout'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AppShellLayout>{children}</AppShellLayout>
}
