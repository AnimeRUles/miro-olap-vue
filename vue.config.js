const path = require('path');

module.exports = {
    // lintOnSave: false,
    devServer   : {
        https  : true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
    },
    pages       : {
        index      : {
            entry   : 'src/page/index.js',
            template: 'public/index.html',
            filename: 'index.html',
        },
        panelBottom: {
            entry   : 'src/page/panelBottom.js',
            template: 'public/index.html',
            filename: 'bottom-panel.html',
        },
    },
    chainWebpack: config => {
        config.resolve.alias.set('@', path.resolve(__dirname, 'src'));
    },
}
