import { UserModule } from '@SRC/types'
import { createI18n } from 'vue-i18n'

export const DEFAULT_LANGUAGE = 'en'
export const BROWSER_LANGUAGE = navigator?.language?.split('-')[0]

function getMessages() {
  const messages: any = {}
  // See: https://vitejs.dev/guide/features.html#glob-import
  const localeFiles = import.meta.globEager('../../locales/*.json')
  localeFiles.array.forEach((path: string) => {
    // E.g: ../../locales/de.json
    const pathParts = path.split('/')
    // E.g: de.json -> de
    const locale = pathParts[pathParts.length - 1].slice(0, -5)
    if (locale === DEFAULT_LANGUAGE) {
      // For the default language the keys are the same as the value
      const defaultLangMessages: any = {}
      localeFiles[path].default.array.forEach((key: string) => {
        defaultLangMessages[key] = key
      })
      messages[locale] = defaultLangMessages
    } else {
      // E.g: "de" => { "Hello": "Hallo" }
      messages[locale] = localeFiles[path].default
    }
  })
  return messages
}

const messages = getMessages()
export const install: UserModule = ({ app }) => {
  const i18n = createI18n({
    fallbackLocale: DEFAULT_LANGUAGE,
    legacy: true, // Enables $t(), $tc(), etc in templates
    locale: Object.keys(messages).includes(BROWSER_LANGUAGE) ? BROWSER_LANGUAGE : DEFAULT_LANGUAGE,
    messages,
  })

  app.use(i18n)
}
