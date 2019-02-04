const path = require('path');
const fs = require('fs');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const webpack = require('webpack');
const envConfigs = require('./src/resources/config.js');
const dist = 'dist';
const resources = 'resources';
const src = 'src';
const output = 'output';
const isMiniCssPlugin = true;


//let csses = fs.readdirSync(path.resolve(__dirname, src, 'resources', 'css'));
//const cssMap = {};
// csses.forEach(css => {
//   if(path.extname(css).toLowerCase() === '.css') {
//       var absPath = path.join(__dirname, src, 'resources', 'css', css);
//       css = css.replace('.css', '');
//       cssMap[css] = absPath;
//   }
// });

var entryMap = {};

//-------------https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a

entryMap['cssMod'] = path.join(__dirname, src, 'cssModule', 'cssMod.js')

var getAllModuleToBuild = (region) => {
  let modules = fs.readdirSync(path.resolve(__dirname, src, 'modentery'));
  modules = envConfigs.filterModuleForRegion(modules, region);
  const moduleMap = {};
  modules.forEach(module => {
    var absPath = path.join(__dirname, src, 'modentery', module);
    module = module.replace('.js', '');
    moduleMap[module] = absPath;
  });
  return moduleMap;
}

var wpConfig = (env) => {
  var envConfig = envConfigs.getEnviormentConfigurations(env.enviorment, env.region);
  const moduleMap = getAllModuleToBuild(env.region);
  Object.assign(entryMap, moduleMap);

  var copyAssetMap = [];
  var commonAssetIn = path.join(__dirname, 'src', 'assets', 'commonAsset');
  var commonAssetOut = path.join(__dirname, output, envConfig.distPath, dist, 'asset');
  copyAssetMap.push({from: commonAssetIn, to: commonAssetOut});
  if(envConfig.envSpecAsset) {
    var envAssetIn = path.join(__dirname, 'src', 'assets', envConfig.envSpecAsset);
    var envAssetOut = path.join(__dirname, output, envConfig.distPath, dist, envConfig.envSpecAsset);
    copyAssetMap.push({from: envAssetIn, to: envAssetOut})
  }

  return{
   entry: entryMap,
   output: {
     path: path.join(__dirname, output, envConfig.distPath, dist),
     filename: '[name]/bundle.js',
     publicPath: '/public/'
   },
   resolve: {
  	extensions: ['.js', '.jsx']
  },

   module: {
      rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {loader: 'babel-loader', options: { presets: ['@babel/preset-env', '@babel/preset-react'] }}
      },{
           test: /\.css$/,
           exclude: path.resolve(__dirname, src, 'cssModule', 'css'),
           use: [isMiniCssPlugin ?  MiniCssExtractPlugin.loader : 'style-loader', "css-loader"]
      },{
           test: /\.less/,
           exclude: path.resolve(__dirname, src, 'cssModule', 'css'),
           use: [isMiniCssPlugin ?  MiniCssExtractPlugin.loader : 'style-loader', "css-loader", "less-loader"]
      },{
           test: /\.css$/,
           include: path.resolve(__dirname, src, 'cssModule', 'css'),
           use: [MiniCssExtractPlugin.loader, "css-loader"]
      },{
           test: /\.less/,
           include: path.resolve(__dirname, src, 'cssModule', 'css'),
           use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
      },{
          test: /\.(png|jpg|gif)$/i,
          use: [{ loader: 'url-loader', options: { limit: 10, name: "images/[name]-[hash].[ext]"}}]
      },{
        test: /\.(txt|csv)$/,
        use: 'raw-loader'
      }]
   },
   plugins: [
     new CleanWebpackPlugin([`${output}/${envConfig.distPath}`]),
     new MiniCssExtractPlugin({filename: "[name]/style.css", chunkFilename: "[id].css" }),
     new webpack.DefinePlugin(envConfig),
     new CopyWebpackPlugin(copyAssetMap),
     new HtmlWebpackPlugin({filename: "mod1-index.html",
                            template: path.resolve(__dirname, src, 'html-index', 'mod1-index.html'),
                            chunks: ["mod1-index", 'cssMod']}),
    new HtmlWebpackPlugin({filename: "euspec-index.html",
                            template: path.resolve(__dirname, src, 'html-index', 'euspec-index.html'),
                            chunks: ["euspec-index", 'cssMod']}),
    new HtmlWebpackPlugin({filename: "index.html",
                            template: path.resolve(__dirname, src, 'html-index', 'index.html'),
                            chunks: ["mod1-index", "euspec-index"]})
   ],

   mode: "development",
   optimization: {
     minimize: false
   },

   devtool: 'eval-source-map',

   devServer: {
      inline: true,
	    host: "localhost",
      port: 3000,
      proxy: {
        '/posts': {target: 'http://jsonplaceholder.typicode.com/', changeOrigin: true }
        //'/posts': {target: 'localhost:8080/', changeOrigin: true }
      },
   },
}}
module.exports = wpConfig;
