const fs = require('fs')

module.exports = async_stats

async function async_stats( path = null ) {
  if (!path || typeof path == 'string') throw new Error('path arg is required and must be a string')

  return new Promise((resolve, reject) => {

  })
}