module.exports = {
    // lintOnSave: false,
    devServer: {
        https  : true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
    },
    pages    : {
        index      : {
            entry   : 'src/page/index.js',
            template: 'public/index.html'
        },
        panelBottom: {
            entry   : 'src/page/panelBottom.js',
            template: 'public/index.html'
        },
    }
}
