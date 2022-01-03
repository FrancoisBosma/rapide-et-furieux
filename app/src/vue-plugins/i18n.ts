import type { UserModule } from '@SRC/types'
import { createI18n } from 'vue-i18n'
// import type { PathValue } from '@intlify/core-base'

export const DEFAULT_LANGUAGE = 'en'
export const BROWSER_LANGUAGE = navigator?.language?.split('-')[0]

const messages = Object.fromEntries(
  Object.entries(import.meta.globEager('../../locales/*.json')).map(([key, value]) => {
    return [key.slice('../../locales/'.length, -5), value.default]
  })
)

const messageResolver = (obj: any, path: string) => {
  // eslint-disable-next-line no-restricted-syntax
  debugger
  console.log('RRRRRRRRRRRRRRR')
  const pathParts: Array<string> = path.split('_')
  let subLocale = obj
  for (let index = 0; index < Object.keys(pathParts).length - 1; index++) {
    subLocale = subLocale[pathParts[index]]
  }
  console.log(subLocale[pathParts[pathParts.length - 1]])
  return subLocale[pathParts[pathParts.length - 1]] ?? null
}

export const install: UserModule = ({ app }) => {
  const i18n = createI18n({
    fallbackFormat: true,
    fallbackLocale: DEFAULT_LANGUAGE,
    legacy: true, // Enables $t(), $tc(), etc in templates
    // legacy: false, // Enables $t(), $tc(), etc in templates
    locale: 'fr', // Object.keys(messages).includes(BROWSER_LANGUAGE) ? BROWSER_LANGUAGE : DEFAULT_LANGUAGE,
    messageResolver,
    messages,
  })
  console.log(i18n) // DELETEME
  app.use(i18n)
}
