const fs = require('fs')

module.exports = async_path_exists

function async_path_exists( path = null ){
  if (!path || typeof path !== 'string') throw new Error('path arg is required and must be a string')

  return new Promise(( resolve, reject ) => {
    fs.access( path, error => {
      resolve( error ? false : true )
    })
  })
}
