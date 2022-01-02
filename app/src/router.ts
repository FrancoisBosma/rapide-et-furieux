import { createRouter, createWebHistory } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'

export const routes = setupLayouts(generatedRoutes)
export const router = createRouter({
  history: createWebHistory(),
  routes,
})
