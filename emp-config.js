const withPreact = require('@efox/emp-preact')
const path = require('path')
const ProjectRootPath = path.resolve('./')
const { getConfig } = require(path.join(ProjectRootPath, './src/config'))
const empConfig = require(`${resolveApp('')}/emp.json`);

module.exports = withPreact(({ config, env, empEnv }) => {
  const confEnv = env === 'production' ? 'prod' : 'dev'
  const conf = getConfig(empEnv || confEnv)

  const host = conf.host
  const port = conf.port
  const publicPath = conf.publicPath

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
        ...empConfig,
        library: { type: 'var', name: empConfig.name },
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
})
