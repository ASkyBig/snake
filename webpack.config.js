const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname + '/dist'),
        filename: 'bundle.js',
        clean: true, // 在生成文件之前清空 output 目录;不再需要CleanWebpackPlugin
        environment: {
            // webpack不适用eval(() => {})包裹和const
            arrowFunction: false,
            const: false
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        // 指定加载器
                        loader: 'babel-loader',
                        // 配置babel
                        options: {
                            // 设置预定义环境
                            presets: [
                                // 指定环境插件
                                 [
                                        "@babel/preset-env",
                                    {
                                        targets: "> 0.25%, not dead",
                                        corejs: "3",
                                        useBuiltIns: "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader',
                ],
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: 'last 3 versions'
                                        }
                                    ]
                                   
                                ]
                            }
                        }
                    },
                    'less-loader'
                ]
            }
           
        ]
    },
    plugins: [
        // new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            title: 'my title',
            template: './src/index.html'
        })
    ],
    resolve: {
        extensions: ['.ts','.js']
    },
    mode: 'development'
}