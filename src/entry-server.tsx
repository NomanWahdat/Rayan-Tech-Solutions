import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Site } from './App'
export { metadata, structuredData, siteRoutes } from './config/seo'
export { projects } from './config/projects'

export function render(
  pathname: string,
  destination: Parameters<ReturnType<typeof renderToPipeableStream>['pipe']>[0]
) {
  return new Promise<void>((resolve, reject) => {
    const stream = renderToPipeableStream(
      <StaticRouter location={pathname}>
        <Site />
      </StaticRouter>,
      {
        onAllReady() {
          stream.pipe(destination)
          resolve()
        },
        onError(error) {
          reject(error)
        },
      }
    )
  })
}
