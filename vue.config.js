const path = require( 'path' );

module.exports = {
    // lintOnSave: false,
    devServer: {
        https  : true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
    },

    pages: {
        index: {
            entry   : 'src/page/index.js',
            template: 'public/index.html',
            filename: 'index.html',
        },

        panelBottom: {
            entry   : 'src/page/bottomBar.js',
            template: 'public/index.html',
            filename: 'bottom-bar.html',
        },

        leftSidebar: {
            entry   : 'src/page/leftSidebar/leftSidebar.js',
            template: 'public/index.html',
            filename: 'left-sidebar.html',
        },

        authorize    : {
            entry   : 'src/page/auth/authorize.js',
            template: 'public/index.html',
            filename: 'auth/authorize.html',
        },
        authorizeSuccess: {
            entry   : 'src/page/auth/success.js',
            template: 'public/index.html',
            filename: 'auth/success.html',
        },
    },

    chainWebpack: config => {
        config.resolve.alias.set( '@', path.resolve( __dirname, 'src' ) );
    },
}
