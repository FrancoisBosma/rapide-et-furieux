// windicss layers
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
// your custom styles here
import './styles/main.css'
// windicss utilities should be the last style import
import 'virtual:windi-utilities.css'
// windicss devtools support (dev only)
import 'virtual:windi-devtools'

// register vue composition api globally
import { ViteSSG } from 'vite-ssg'
import { routes } from '@SRC/router'
import App from '@SRC/App.vue'

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(App, { routes }, (ctx) => {
  // install all vue-plugins under `vue-plugins/`
  Object.values(import.meta.globEager('./vue-plugins/*.ts')).map((i) => i.install?.(ctx))
})
