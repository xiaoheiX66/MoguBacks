"use strict";

module.exports = {
  lintOnsave: "warning",
  devServer: {
    proxyTable: {
      '/api': {
        target: "http://10.3.133.37:8082",
        changeOrigin: true,
        pathRewhite: {
          '^/api': '/'
        }
      }
    }
  }
};