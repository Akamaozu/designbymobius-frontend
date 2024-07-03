const express = require('express')
const compression = require('compression')

module.exports = create_server

function create_server() {
  const server = express()
  console.log('action=create-server')

  server.use(compression())
  console.log('action=load-server-middleware name=gzip')

  return server
}
