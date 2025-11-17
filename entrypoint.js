const path = require('path')
const supe = require('supe')
const { exec } = require('node:child_process')
const utils = require('./utils')

utils.env.load()

const { ENV_NAME } = process.env
console.log({ env: ENV_NAME })

if (ENV_NAME.toLowerCase() === 'production') {
  const supervisor = supe()
  supervisor.start( 'server', path.join(__dirname, './server'))
}

else exec('npm run start:dev')
