module.exports = {
    devServer: {
        proxy: {
            '/scp': {
                target: 'http://47.107.253.252:8082', //---请求 /scp/url 等价于 http://47.107.253.252:8082/scp/url
                changeOrigin: true,
            },
            '/apis': {
                target: 'http://120.78.169.181:8080', //http://120.78.169.181:8080/apis
                changeOrigin: true,
            },
        }
    }
}