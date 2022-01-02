import { authInstance } from './plugin'
import type { AuthPlugin } from './types'

/**
 * Returns the auth instance. Equivalent to using `$auth` inside
 * templates.
 */
export function useAuth(): AuthPlugin {
  return authInstance!
}
