
var path = require('path')
let ROOT_PATH = path.resolve(__dirname,'../');

exports.SRC = path.resolve(ROOT_PATH, 'src');

exports.node_modules = path.resolve(ROOT_PATH, 'node_modules');

exports.DIST = path.resolve(ROOT_PATH, 'dist');


exports.TEMPLATE_prod = path.resolve(ROOT_PATH, 'index_prod.html');
exports.TEMPLATE = path.resolve(ROOT_PATH, 'index.html');