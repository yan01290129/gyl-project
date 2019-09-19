module.exports = {
    devServer: {
        proxy: {
            '/scp': {
                target: 'http://47.107.253.252:8082', //---请求 /scp/text 等价于 http://47.107.253.252:8082/scp/text
                changeOrigin: true,
            },
        }
    }
}