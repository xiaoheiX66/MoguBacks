module.exports ={
    lintOnsave:"warning",
    devServer:{
        proxyTable:{
            '/api':{
                target:" http://192.168.0.100:8082",
                changeOrigin:true,
                pathRewhite:{
                    '^/api':'/'
                }
            }
        }
    }
}