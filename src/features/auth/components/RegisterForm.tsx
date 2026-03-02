'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextInput, PasswordInput, Button, Stack } from '@mantine/core'
import { registerSchema, type RegisterFormValues } from '../schemas'
import { useRegister } from '../hooks'

export function RegisterForm() {
  const { mutate: register, isPending } = useRegister()

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
  })

  const onSubmit = (values: RegisterFormValues) => {
    register(values)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Stack gap="md">
        <TextInput
          label="First name"
          placeholder="John"
          {...form.register('firstName')}
          error={form.formState.errors.firstName?.message}
        />
        <TextInput
          label="Last name"
          placeholder="Doe"
          {...form.register('lastName')}
          error={form.formState.errors.lastName?.message}
        />
        <TextInput
          label="Email"
          placeholder="you@example.com"
          {...form.register('email')}
          error={form.formState.errors.email?.message}
        />
        <PasswordInput
          label="Password"
          placeholder="At least 8 characters"
          {...form.register('password')}
          error={form.formState.errors.password?.message}
        />
        <Button type="submit" loading={isPending}>
          Create account
        </Button>
      </Stack>
    </form>
  )
}
