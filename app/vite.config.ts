import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Markdown from 'vite-plugin-md'
import WindiCSS from 'vite-plugin-windicss'
import { VitePWA } from 'vite-plugin-pwa'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import Inspect from 'vite-plugin-inspect'
import Prism from 'markdown-it-prism'
import LinkAttributes from 'markdown-it-link-attributes'

const markdownWrapperClasses = 'prose prose-sm m-auto text-left'

export default defineConfig({
  resolve: {
    alias: {
      '@ROOT/': `${path.resolve(__dirname)}/`,
      '@SRC/': `${path.resolve(__dirname, 'src')}/`,
      '@GLOBAL/': `${path.resolve(__dirname, 'src/global')}/`,
      '@FEATURES/': `${path.resolve(__dirname, 'src/features')}/`,
    },
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ['vue', 'md'],
      pagesDir: [{ dir: 'src/features/**/router-views', baseRoute: '' }],
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts({
      defaultLayout: 'DefaultLayout',
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      dts: 'src/generated_auto-imports.d.ts',
      imports: ['@vueuse/core', '@vueuse/head', 'vitest', 'vue', 'vue-i18n', 'vue-router'],
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      // search for subdirectories
      deep: true,
      // Allow subdirectories as namespace prefix for components.
      directoryAsNamespace: true,
      // output
      dts: 'src/generated_global_components.d.ts',
      // targeting (== which files will be considered as components)
      globs: ['src/global/components/**/*.vue', 'src/global/components/**/!(README).md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      // custom resolvers
      resolvers: [
        // auto import icons
        // https://github.com/antfu/unplugin-icons
        IconsResolver({
          componentPrefix: '',
          // enabledCollections: ['carbon']
        }),
      ],
    }),

    // https://github.com/antfu/unplugin-icons
    Icons({
      autoInstall: true,
    }),

    // https://github.com/antfu/vite-plugin-windicss
    WindiCSS({
      safelist: markdownWrapperClasses,
    }),

    // https://github.com/antfu/vite-plugin-md
    Markdown({
      headEnabled: true,
      markdownItSetup(md) {
        // https://prismjs.com/
        md.use(Prism)
        md.use(LinkAttributes, {
          attrs: {
            rel: 'noopener',
            target: '_blank',
          },
          pattern: /^https?:\/\//,
        })
      },
      wrapperClasses: markdownWrapperClasses,
    }),

    // https://github.com/antfu/vite-plugin-pwa
    VitePWA({
      includeAssets: ['favicon.svg', 'robots.txt', 'safari-pinned-tab.svg'],
      manifest: {
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
        name: 'Rapide-et-furieux',
        short_name: 'Rapide-et-furieux',
        theme_color: '#ffffff',
      },
      registerType: 'autoUpdate',
    }),

    // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
    VueI18n({
      compositionOnly: true,
      include: [path.resolve(__dirname, 'locales/**')],
      runtimeOnly: true,
    }),

    // https://github.com/antfu/vite-plugin-inspect
    Inspect({
      // change this to enable inspect for debugging
      enabled: false,
    }),
  ],

  server: {
    hmr: {
      // port: 3334,
    },
    fs: {
      strict: true,
    },
  },

  // https://github.com/antfu/vite-ssg
  ssgOptions: {
    formatting: 'minify',
    script: 'async',
  },

  optimizeDeps: {
    exclude: ['vue-demi'],
    include: ['vue', 'vue-router', '@vueuse/core', '@vueuse/head'],
  },

  // https://github.com/vitest-dev/vitest
  test: {
    include: ['tests/**/*.test.ts'],
    environment: 'jsdom',
    deps: {
      inline: ['@vue', '@vueuse', 'vue-demi'],
    },
  },
})
