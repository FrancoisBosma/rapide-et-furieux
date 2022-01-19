import type { UserModule } from '@SRC/types'
import { createI18n } from 'vue-i18n'

const DEFAULT_LANGUAGE = 'fr'

const messages = Object.fromEntries(
  Object.entries(import.meta.globEager('../../locales/*.json')).map(([filePath, fileContent]) => {
    const localeName = filePath.slice('../../locales/'.length, -1 * '.json'.length)
    if (localeName === DEFAULT_LANGUAGE)
      return [localeName, Object.fromEntries(Object.keys(fileContent.default).map((key) => [key, key]))]
    return [localeName, fileContent.default]
  })
)

export const install: UserModule = ({ app, isClient }) => {
  const browserLanguage = isClient ? navigator?.language?.split('-')[0] : DEFAULT_LANGUAGE
  const i18n = createI18n({
    fallbackLocale: DEFAULT_LANGUAGE,
    legacy: true, // Enables $t(), $tc(), etc in templates
    locale: Object.keys(messages).includes(browserLanguage) ? browserLanguage : DEFAULT_LANGUAGE,
    messages,
  })
  app.use(i18n)
}
