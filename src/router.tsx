import { dehydrate, hydrate } from '@tanstack/react-query'
import { createRouter } from '@tanstack/react-router'
import { queryClient } from './routes/__root'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
export const getRouter = () => {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    context: {
      queryClient,
    },
    dehydrate: () => {
      return {
        queryState: dehydrate(queryClient) as any,
      }
    },
    hydrate: (data) => {
      hydrate(queryClient, data.queryState)
    },
  })

  return router
}
