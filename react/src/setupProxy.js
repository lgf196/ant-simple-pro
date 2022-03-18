/**
 * @description :{配置代理}
 */
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(createProxyMiddleware('/api',
        {
            target: 'http://localhost:8080',
            changeOrigin: true,
            pathRewrite: {'^/api': '/api'}
        }
    ));
}
