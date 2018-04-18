const path = require('path');
const DllPlugin = require('webpack/lib/DllPlugin');

module.exports = {
  // JS 执行入口文件
  entry: {
    polyfill:['babel-polyfill'],
    vue: ['vue', 'vue-router','vuex'],
  },
  output: {
    filename: '[name].dll.js',
 
    path: path.resolve(__dirname, 'config'),
    library: '_dll_[name]',
  },
  plugins: [
    // 接入 DllPlugin
    new DllPlugin({
      name: '_dll_[name]',
      // 描述动态链接库的 manifest.json 文件输出时的文件名称
      path: path.join(__dirname, 'config', '[name].manifest.json'),
    }),
  ],
};


