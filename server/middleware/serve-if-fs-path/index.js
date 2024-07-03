const md5 = require('md5')
const mimetypes = require('mime-types')

const utils = require('../../../utils')

const DIRS_TO_SERVE = [
  'build',
  'public',
]

module.exports = serve_if_fs_path

function serve_if_fs_path( req, res, next ) {
  const filename = req.path.split('/').pop()
  if (!filename) return next()

  const file_extension = filename.split('.').pop()
  if (!file_extension) return next()

  const path_md5 = md5(req.path)
  const get_file_key = 'get-file-'+ path_md5
  const file_exists_key = 'file-exists-'+ path_md5

  const get_and_serve_file = async () => {
    if (!Object.prototype.hasOwnProperty.call( req.app.locals, 'inflight_actions' )) throw new Error( 'server store "inflight_actions" not found' )
    if (!Object.prototype.hasOwnProperty.call( req.app.locals, 'cache' )) throw new Error( 'server store "cache" not found' )

    const {
      inflight_actions: inflight,
      cache,
    } = req.app.locals

    let file_path_on_disk

    // file exists result not cached, get and cache
    if (!cache.hasOwnProperty(file_exists_key)) {

      // file exists check not inflight, start check
      if (!inflight.hasOwnProperty(file_exists_key)) {
        inflight[file_exists_key] = new Promise((resolve, reject) => {
          let exists = false

          const check_cache_paths_for_file = async () => {
            for (i in DIRS_TO_SERVE) {
              const dir = DIRS_TO_SERVE[i]
              const exists_in_cache_path = await utils.fs.async_path_exists(dir + req.path)
              if (exists_in_cache_path) {
                exists = true
                file_path_on_disk = dir + req.path
              }
            }

            const file_exists_struct = { exists }
            if (exists) file_exists_struct.path = file_path_on_disk

            let log_entry = `action=check-disk-for-file req_path=${ req.path} exists=${ exists }`
            if (exists) log_entry += ` file_path="${ file_path_on_disk }"`
            console.log(log_entry)

            cache[file_exists_key] = file_exists_struct
            delete inflight[file_exists_key]

            resolve(file_exists_struct)
          }

          check_cache_paths_for_file()
        })
      }
    }

    await inflight[file_exists_key]

    // file doesn't exist, let router handle request
    if (!cache[file_exists_key].exists) return next()

    // file content not cached, get and cache
    if (!cache.hasOwnProperty(get_file_key)) {

      // get file not inflight, start
      if (!inflight.hasOwnProperty(get_file_key)) {
        inflight[get_file_key] = new Promise((resolve, reject) => {
          const get_file_from_disk = async () => {
            console.log(`action=cache-file-from-disk-in-memory path="${ cache[file_exists_key].path }"`)

            try {
              const get_file_args = { encoding: null }
              const filename = req.path.split('/').pop()
              const file_ext = filename.split('.').pop()

              switch (file_ext) {
                case 'html':
                case 'css':
                case 'js':
                  get_file_args.encoding = 'utf-8'
                break
              }

              const content = await utils.fs.async_get_file( cache[file_exists_key].path, get_file_args )
              cache[get_file_key] = {
                content,
                mimetype: mimetypes.lookup(cache[file_exists_key].path),
              }
            }

            catch(error) {
              // no-op ... don't do anything drastic if get file fails
              console.log(`action=cache-file-from-disk-in-memory-error path="${ cache[file_exists_key].path }" error="${ error.message}"`)
            }

            resolve(cache[get_file_key])
            delete inflight[get_file_key]
          }

          get_file_from_disk()
        })

        await inflight[get_file_key]

        ;(!cache.hasOwnProperty(get_file_key))
          ? res.sendStatus(500)
          : (() => {
              res.set('content-type', cache[get_file_key].mimetype)
              res.send(cache[get_file_key].content)
            })()
      }

      // file exists check already running, wait for completion
      else {
        await inflight[get_file_key]

        ;(!cache.hasOwnProperty(get_file_key))
          ? res.sendStatus(500)
          : (() => {
              res.set('content-type', cache[get_file_key].mimetype)
              res.set('cache-control', 'public, max-age=31536000')
              res.send(cache[get_file_key].content)
            })()
      }
    }

    else {
      res.set('content-type', cache[get_file_key].mimetype)
      res.set('cache-control', 'public, max-age=31536000')
      res.send(cache[get_file_key].content)
    }
  }

  get_and_serve_file()
}