const {
    override,
    addWebpackModuleRule,
} = require('customize-cra');

module.exports = override(
    // resolve: {
    //     alias: {
    //         'three': 'bmap-three'
    //     }
    // },
    // scss全局变量
    addWebpackModuleRule({
        test: /\.scss$/,
        use: [
            'style-loader',
            'css-loader',
            'sass-loader',
            {
                loader: 'sass-resources-loader',
                options: {
                    // 注意在项目中新增/src/assets/scss/varable.scss文件
                    resources: ['./src/assets/scss/varable.scss'],
                },
            },
        ],
    }),
);