import type { ComponentType } from 'react'
import { createBrowserRouter } from 'react-router'
import { SiteLayout } from './components/layout/SiteLayout'
import RouteError from './pages/RouteError'
import NotFound from './pages/NotFound'

// Each page is its own chunk; only the shell (header, footer) ships up front.
const page = (load: () => Promise<{ default: ComponentType }>) => async () => ({ Component: (await load()).default })

export const router = createBrowserRouter([
  {
    path: '/',
    Component: SiteLayout,
    errorElement: <RouteError />,
    hydrateFallbackElement: <div className="min-h-dvh" aria-busy="true" />,
    children: [
      { index: true, lazy: page(() => import('./pages/Home')) },
      { path: 'about', lazy: page(() => import('./pages/About')) },
      { path: 'people', lazy: page(() => import('./pages/People')) },
      { path: 'projects', lazy: page(() => import('./pages/Projects')) },
      { path: 'projects/:slug', lazy: page(() => import('./pages/ProjectDetail')) },
      { path: 'activities', lazy: page(() => import('./pages/Activities')) },
      { path: 'explore', lazy: page(() => import('./pages/Explore')) },
      { path: 'get-involved', lazy: page(() => import('./pages/GetInvolved')) },
      { path: 'credits', lazy: page(() => import('./pages/Credits')) },
      { path: '*', Component: NotFound },
    ],
  },
])
