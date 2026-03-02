import { Paper, Title, Anchor, Text, Center, Stack } from '@mantine/core'
import { LoginForm } from '@/features/auth/components/LoginForm'
import classes from './page.module.css'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <Center h="100vh">
      <Stack>
        <Title ta="center" className={classes.title}>
          Welcome back!
        </Title>

        <Text className={classes.subtitle}>
          Do not have an account yet?{' '}
          <Anchor component={Link} href="/register">
            Create account
          </Anchor>
        </Text>
        <Paper withBorder shadow="sm" p={22} mt={30} radius="md" w={420}>
          <LoginForm />
        </Paper>
      </Stack>
    </Center>
  )
}
