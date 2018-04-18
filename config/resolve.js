
let path = require('./path')

// 配置寻找模块的规则
let resolve = function () {
    return {
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            icss: 'iview/dist/styles/'
        },
        modules: [path.node_modules],
        extensions: ['.js', '.vue'],
        enforceExtension: false,
        mainFields: ['jsnext:main', 'browser', 'main']

    }
}()


let performance = function () {
    return {
        hints: false,
        maxEntrypointSize: 500000,
        maxAssetSize: 100000,
        assetFilter: function (assetFilename) {
            return assetFilename.endsWith('.js');
        }
    }
}()




module.exports = {
    resolve,
    performance
}

