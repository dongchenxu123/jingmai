var express = require('express');
var compression = require('compression');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require('webpack-hot-middleware');
var app = express();
var path = require('path')
var port = 3335;

// var open = require('open')


var proxy = require('http-proxy-middleware')

//context可以是单个字符串，也可以是多个字符串数组，分别对应你需要代理的api,星号（*）表示匹配当前路径下面的所有api
const context = `/api/*`

//options可选的配置参数请自行看readme.md文档，通常只需要配置target，也就是你的api所属的域名。
const options = {
    target: 'http://www.xxx.com',
    changeOrigin: true
}

//将options对象用proxy封装起来，作为参数传递
// const apiProxy = proxy(options)

const compiler = webpack(webpackConfig);

// gzip压缩
app.use(compression());
const devMiddleware = webpackDevMiddleware(compiler, {
  historyApiFallback: true,
  noInfo: true,
  stats: {
    colors: true
  },
  publicPath: webpackConfig.output.publicPath
})
app.use(devMiddleware);


app.use(webpackHotMiddleware(compiler, {

  path: '/__webpack_hmr'
}));

/*app.use('/api/ware_search', proxyMiddleware({
    target: 'http://jingmai.xibao100.com',
    ws: true,
    pathRewrite: {
        '^/api/ware_search' : '/ware_search',     // rewrite path
        '^/api/remove/path' : '/path'           // remove base path
    },
    router: {
      'jingmai.xibao100.com': 'http://jingmai.xibao100.com'
    },
    changeOrigin: true,
}))
*/

app.use(express.static(path.join(__dirname, 'build')))


// app.get('/ware', function (req, res) {
//     const htmlBuffer = devMiddleware.fileSystem.readFileSync(`${webpackConfig.output.path}/ware.html`)
//     res.send(htmlBuffer.toString())
//
// })

var router = express.Router();
router.get('/_dev/dsp/site/ware.html', function (req, res, next) {
  res.sendfile(`${webpackConfig.output.path}/ware.html`); // 发送静态文件
});
router.get('/_dev/dsp/site/report.html', function (req, res, next) {
  res.sendfile(`${webpackConfig.output.path}/report.html`);
});

// 根目录下的所有404错误，引向index.html页面，让react-router进行解析
router.get('*', function(req, res){
      const htmlBuffer = devMiddleware.fileSystem.readFileSync(`${webpackConfig.output.path}/index.html`)
      res.send(htmlBuffer.toString())
});
app.use(router);


//现在你只需要执行这一行代码，当你访问需要跨域的api资源时，就可以成功访问到了。
// app.use(context, apiProxy)

app.listen(port, function(err){
  if (err) {
    console.log('err : ', err)
  } else {
    console.log(`http://localhost:${port}`)
  }
})
