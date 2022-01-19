import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'

export const routes = setupLayouts(generatedRoutes)
