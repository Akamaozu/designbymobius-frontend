const path = require('path')
const child_process = require('child_process')

module.exports = async_build

async function async_build() {
  return new Promise( (resolve, reject) => {
    const build_parent_dir_path = path.join( __dirname, '../../' )

    child_process.exec('npm run build', { cwd: build_parent_dir_path }, (error, stdout, stderr) => {
      if (error) {
        console.log('action=build-app success=false')
        console.log('action=log-build-app-process-stdout entry="'+ stdout + '"')
        console.log('action=log-build-app-process-stderr entry="'+ stderr + '"')

        reject(error)
      }

      else {
        console.log('action=build-app success=true')

        resolve(true)
      }
    })
  })
}
