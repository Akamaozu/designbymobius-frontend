const fs = require('fs')
const default_get_file_config = { encoding: 'utf8' }

module.exports = async_get_file

async function async_get_file( path_to_file, config = {}) {
  return new Promise( (resolve, reject) => {
    const fs_config = { ...default_get_file_config, ...config }

    console.log( 'action=get-file-from-disk path="'+ path_to_file +'"' )
    fs.readFile( path_to_file, fs_config, (error, data) => {
      if (error) reject(error)
      else resolve(data)
    })
  })
}
