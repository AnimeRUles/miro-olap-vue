const path = require('path')

module.exports = {
    resolve: {
        alias: {
            '@': path.join(__dirname, 'src'),
        }
    },
}
