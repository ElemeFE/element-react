var fs = require('fs')
var path = require('path')

var content = fs.readFileSync(path.join(__dirname, 'githooks/commit-msg'))
fs.writeFileSync(path.join(__dirname, '../.git/hooks/commit-msg'), content, {flag: 'w+', mode: 0o755})


