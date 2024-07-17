const {createProxyMiddleware} = require('http-proxy-middleware')
module.exports = {
  publicPath: "",
devServer:{
proxy:{
  '/portal.army.idf/sites/hafifon383':{
    target:"https://portal.army.idf",
    changeOrigin:true,
    pathRewrite:{'^/sharepoint':''},
    onProxyReq:(proxyReq,req,res)=>{
      proxyReq.setHeader('Cookie','cookie-value')
    }
  }
}
},
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: true
    },
    
  },

  transpileDependencies: ['quasar'],
 };
