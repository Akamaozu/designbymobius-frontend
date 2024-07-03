const path = require('path')
const utils = require('../../../utils')

let prebuild_html
let getting_prebuild
const path_to_prebuild = path.join( __dirname, '../../../public/reload.html' )

let app_html
let getting_app
const path_to_app = path.join( __dirname, '../../../build/index.html' )

module.exports = serve_app_or_prebuild

function serve_app_or_prebuild( request, response, next ) {
	if (!request.app.locals?.app_build?.built) async_get_and_serve_prebuild_html({ response })
  else async_get_and_serve_app_html({ response })
}

async function async_get_and_serve_prebuild_html({ response }) {
  if (prebuild_html) return response.send( prebuild_html )

  if (!getting_prebuild) {
    getting_prebuild = true

    prebuild_html = await utils.fs.async_get_file( path_to_prebuild )
    getting_prebuild = false
  }

  else {
    await getting_prebuild
  }

  response.send( prebuild_html ) 
}

async function async_get_and_serve_app_html({ response }) {
  if (app_html) return response.send( app_html )

  if (!getting_app) {
    getting_app = true

    app_html = await utils.fs.async_get_file( path_to_app )
    getting_app = false
  }

  else {
    await getting_app
  }

  response.send( app_html ) 
}
