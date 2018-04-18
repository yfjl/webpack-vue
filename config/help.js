


exports.getHost = function() {
    const os = require('os')
    let IPv4 = '127.0.0.1'
    let interfaces = os.networkInterfaces()
    for (let key in interfaces) {
      interfaces[key].some(function(details){
        if (details.family == 'IPv4' && key == 'en0') {
          IPv4 = details.address
          return true
        }
      })
    }
    return IPv4
  }