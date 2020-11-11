// const createBabelConfig = require('babel-config');
const path = require('path')
module.exports = ({config, env, empEnv}) => {
  const port = 8083
  const projectName = 'empPReactBase'

  const url = {
    prod: 'https://emp-react-base.yourdomain.com/',
    test: 'https://emp-react-base-test.yourdomain.com/',
    dev: `http://localhost:${port}/`,
  }
  const publicPath = empEnv ? url[empEnv] : `http://localhost:${port}/`

  const srcPath = path.resolve('./src')
  config.entry('index').clear().add(path.join(srcPath, 'index.js'))

  config.plugin('html').tap(args => {
    args[0] = {
      ...args[0],
      ...{
        title: 'EMP PREACT BASE',
        files: {
        },
      },
    }
    return args
  })

  config.plugin('mf').tap(args => {
    args[0] = {
      ...args[0],
      ...{
        name: projectName,
        library: {type: 'var', name: projectName},
        filename: 'emp.js',
        exposes: {
          './header': 'src/components/header/index.jsx',
        },
      },
    }
    return args 
  })

  config.output.publicPath(publicPath)
  config.devServer.port(port)
}
