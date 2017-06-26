require('dotenv').config()

const knork = require('@npm/knork')
const reply = require('@npm/knork/reply')
const http = require('http')
const bole = require('bole')
const logger = bole(process.env.SERVICE_NAME)

const LoggingMiddleware = require('@npm/knork/middleware/logging')
const MetricsMiddleware = require('@npm/knork/middleware/metrics')
const MonitorMiddleware = require('@npm/knork/middleware/monitor')
const CommonMiddleware = require('@npm/knork/middleware/common')

const routing = require('@npm/knork/routing')

const port = process.env.PORT || 5000
const scope = routing.param('scope', () => true)

const routes = routing`
  GET /v1/scopes/${scope}/package-teams packageTeamHandler
`({
  packageTeamHandler
})

module.exports = (opts = {}) => {
  const server = http.createServer().listen(port)
  const middleware = [
    LoggingMiddleware,
    MetricsMiddleware,
    MonitorMiddleware,
    CommonMiddleware
  ]

  const getServer = knork(process.env.SERVICE_NAME, server, routes, middleware, {isExternal: false})

  return getServer
    .tap((knorkServer) => {
      logger.info(`${process.env.SERVICE_NAME} running on :${port}`)
    })
}

function packageTeamHandler (req, context) {
  logger.info(req)
  return reply.empty()
}
