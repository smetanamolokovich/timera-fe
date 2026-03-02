'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Group,
  Anchor,
  Checkbox,
} from '@mantine/core'
import { loginSchema, type LoginFormValues } from '../schemas'
import { useLogin } from '../hooks'

export function LoginForm() {
  const { mutate: login, isPending } = useLogin()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = (values: LoginFormValues) => {
    login(values)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Stack gap="md">
        <TextInput
          label="Email"
          placeholder="you@example.com"
          {...form.register('email')}
          error={form.formState.errors.email?.message}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          {...form.register('password')}
          error={form.formState.errors.password?.message}
        />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button type="submit" loading={isPending}>
          Sign in
        </Button>
      </Stack>
    </form>
  )
}
