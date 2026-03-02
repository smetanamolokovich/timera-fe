import { RegisterForm } from '@/features/auth/components/RegisterForm'
import { Center, Stack, Title, Anchor, Paper, Text } from '@mantine/core'
import classes from './page.module.css'
import Link from 'next/dist/client/link'

export default function RegisterPage() {
  return (
    <Center h="100vh">
      <Stack>
        <Title ta="center" className={classes.title}>
          Create your account
        </Title>

        <Text className={classes.subtitle}>
          Already have an account?{' '}
          <Anchor component={Link} href="/login">
            Login
          </Anchor>
        </Text>
        <Paper withBorder shadow="sm" p={22} mt={30} radius="md" w={420}>
          <RegisterForm />
        </Paper>
      </Stack>
    </Center>
  )
}
