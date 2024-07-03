const path = require('path')
const async_path_exists = require('../fs/path-exists')

module.exports = async_is_built

async function async_is_built() {
  const build_entry_file_path = path.join( __dirname, '../../build/index.html' )
  const build_entry_file_exists = ( await async_path_exists( build_entry_file_path ) )
    ? true
    : false

  console.log( `action=check-if-app-build-exists built=${ build_entry_file_exists }` )

  return build_entry_file_exists
}
