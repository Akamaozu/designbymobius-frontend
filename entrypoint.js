const path = require('path')
const supe = require('supe')
const { exec } = require('node:child_process')
const utils = require('./utils')

utils.env.load()

const { ENV_NAME } = process.env

if (ENV_NAME.toLowerCase() === 'production') {
  console.log('action=start-server type=production')

  const supervisor = supe()
  supervisor.start( 'server', path.join(__dirname, './server'))
}

else {
  console.log('action=start-server type=development')
  exec('npm run start:dev')
}
