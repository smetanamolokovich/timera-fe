import { createTheme, rem } from '@mantine/core'

export const theme = createTheme({
  primaryColor: 'blue',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
  fontSizes: {
    xs: rem(12),
    sm: rem(13),
    md: rem(14),
    lg: rem(16),
    xl: rem(18),
  },
  radius: {
    xs: rem(4),
    sm: rem(6),
    md: rem(8),
    lg: rem(12),
    xl: rem(16),
  },
  components: {
    Button: { defaultProps: { radius: 'md' } },
    Input: { defaultProps: { radius: 'md' } },
    Card: { defaultProps: { radius: 'md', shadow: 'sm' } },
  },
})
