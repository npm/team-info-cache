const tap = require('tap')
const request = require('request')
const Promise = require('bluebird')

const reqP = Promise.promisify(request)

tap.test('connection returns 200', t => {
  return reqP(`http://127.0.0.1/v1/scopes/${scope}/package-teams?team={},{}`)
    .then(body => {
    })
})