## Vue plugins

A custom user [vue-plugins](https://v3.vuejs.org/guide/plugins.html#writing-a-plugin) system. Place in this folder a `*.ts` file with the following template, the install function will be automagically run (called from `main.ts`).

```ts
import { UserModule } from '@SRC/types'

export const install: UserModule = ({ app, router, isClient }) => {
  // do something
}
```
