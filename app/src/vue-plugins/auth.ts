import type { UserModule } from '@SRC/types'
import axiosInstance from '@SRC/api/axios'
import { createAuth } from '@SRC/auth'

export const install: UserModule = ({ app, isClient, router }) => {
  if (!isClient) return
  const auth = createAuth({
    router,
    loginRedirectRoute: { name: 'index' },
    logoutRedirectRoute: { name: 'index' },
    autoConfigureNavigationGuards: true,
    axios: {
      instance: axiosInstance,
      autoAddAuthorizationHeader: true,
      // authorizationHeaderPrefix: 'Token', // default: 'Bearer'
    },
  })

  app.use(auth)
}
