const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(createProxyMiddleware('/ISteamUser',
        {
            target: "https://partner.steam-api.com",
            changeOrigin:true,
            pathRewrite: {
                "^/ISteamUser": "/"
            },
            "secure":true  //如果访问的是https类的链接，就需要设置为true
        }))
}
