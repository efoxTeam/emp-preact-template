# EMP preact 基站模板工程

## 依赖库 package.json

``` json

"devDependencies": {
  "@efox/emp-cli": "^1.2.9",
  "@efox/emp-tsconfig": "^1.0.4"
},
"dependencies": {
  "@babel/plugin-transform-react-jsx": "^7.12.5",
  "babel-plugin-jsx-pragmatic": "^1.0.2",
  "preact": "^10.5.5",
  "preact-router": "^3.2.1"
}

```

## 微前端配置 emp-config.js

``` js

const path = require('path')
const ProjectRootPath = path.resolve('./')
const {getConfig} = require(path.join(ProjectRootPath, './src/config'))

module.exports = ({config, env, empEnv}) => {
  const confEnv = env === 'production' ? 'prod' : 'dev'
  const conf = getConfig(empEnv || confEnv)
  console.log('config', conf)

  const host = conf.host
  const port = conf.port
  const projectName = 'preactComponents'
  const publicPath = conf.publicPath

  const srcPath = path.resolve('./src')
  config.entry('index').clear().add(path.join(srcPath, 'index.js'))

  config.module
    .rule('preact')
    .test(/\.(js|jsx|ts|tsx)$/)
    .exclude
    .add(/node_modules/)
    .end()
    .use('babel')
    .loader('babel-loader')
    .options({
      plugins: [
      [
        require('@babel/plugin-transform-react-jsx').default,
        {
          pragma: "h",
          pragmaFrag: "Fragment"
        }
      ],
      [
        require.resolve('babel-plugin-jsx-pragmatic'),
        {
          module: "preact",
          import: "h",
          export: "h"
        }
      ]
    ]
    })

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

```