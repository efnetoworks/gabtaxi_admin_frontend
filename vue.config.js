const path = require('path');
const webpack = require('webpack');

function resolveSrc(_path) {
    return path.join(__dirname, _path)
}
module.exports = {
    pwa: {
        name: 'My Store',
        themeColor: '#66615B',
        msTileColor: '#66615B',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: '#66615B'
    },
    css: {
        // Enable CSS source maps.
        sourceMap: process.env.NODE_ENV !== 'production'
    },
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                productName: "My Store",
                appId: 'mystore.com',
                win: {
                    "target": [
                        "nsis"
                    ],
                    icon: 'public/static/img/shoppingCart.ico',
                },
            },
        },
    },
};