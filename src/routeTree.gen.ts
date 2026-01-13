import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as WorkProjectIdImport } from './routes/work/$projectId'

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const WorkProjectIdRoute = WorkProjectIdImport.update({
  id: '/work/$projectId',
  path: '/work/$projectId',
  getParentRoute: () => rootRoute,
} as any)

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/work/$projectId': {
      id: '/work/$projectId'
      path: '/work/$projectId'
      fullPath: '/work/$projectId'
      preLoaderRoute: typeof WorkProjectIdImport
      parentRoute: typeof rootRoute
    }
  }
}

export const routeTree = rootRoute.addChildren([IndexRoute, WorkProjectIdRoute])
