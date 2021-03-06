const path = require('path'); // модуль для работы с путями
const HTMLWebpackPlugin = require('html-webpack-plugin') // плагин для загрузки HTML-кода
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin') // автоочистка неактуальных файлов
const CopyWebpackPlugin = require('copy-webpack-plugin') // копирует файлы в dist
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // создает файл CSS для каждого файла JS, который содержит CSS
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin') // оптимизация CSS файлов
const TerserWebpackPlugin = require('terser-webpack-plugin') // оптимизация JS файлов

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
console.log('IS DEV? : ', isDev)
console.log(process.env.NODE_ENV)

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all' // снижает кол-во кода благодаря vendors, подробнее в доках
        }
    }
    if (isProd) {
        config.minimizer = [
            new CssMinimizerPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config
}

const cssLoaders = (...add) => {
    const loaders = [{
        loader: MiniCssExtractPlugin.loader,
        options: {
            publicPath: './'
        },
    }, 'css-loader', ...add]

    return loaders
}




module.exports = {
    context: path.resolve(__dirname, 'src'), // путь, где лежат все исходники приложения
    mode: 'development', // режим по умолчанию, npm run dev - собрать проект в режиме разработки, см скрипты package.json
    entry: {
        main: './index.js', // точка входа, т.е. нужный файл со скриптами
        anal: './anal.js' // точек может быть сколько нужно
    },
    output: { // куда складываем результат работы вебпака
        filename: '[name].[contenthash].js', // когда ВП соберет все файлы, получатся [имяФайлаИзEntry].[contenthash].js
        path: path.resolve(__dirname, 'dist') // путь, куда всё складывается (возвращает строку)
    },
    resolve: {
        extensions: ['.js', '.json', '.png'], // допустимые расширения файлов
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            // альтернативные пути для импорта и не только, например
            // import Post from '@models/post.js' вместо import Post from 'src/models/post'
            '@': path.resolve(__dirname, 'src')
        }
    },
    optimization: optimization(),
    devServer: { // держит сервер в оперативке, работает через webpack-dev-server
        open: true, // автоматически открывает браузер по умолчанию
        port: 4200
    },
    plugins: [
        new HTMLWebpackPlugin({ //подключение плагина, создает готовый HTML шаблон
            title: 'exploring Webpack', // добавляет тег <Title>, если нет template
            template: './index.html', // загружает HTML-код из файла
            minify: {
                collapseWhitespace: isProd
            }, //оптимизация index.html в проде
        }),
        new CleanWebpackPlugin(), // подключение плагина авточистки
        new CopyWebpackPlugin({ // подключение копирования файлов в dist
            patterns: [{
                from: path.resolve(__dirname, 'src/favicon.png'),
                to: path.resolve(__dirname, 'dist')
            }]
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
    ],
    module: {
        rules: [{
                test: /\.css$/, // когда ВП встречает файл .css, ему необходимо использовать лоадеры ниже
                // use: ['style-loader', 'css-loader'] // запускаются справа налево, устанавливаются отдельно
                // npm i -D style-loader css-loader
                // css-loader позволяет понимать .css-импорты
                // style-loader добавляет стили в <head> в HTML-коде
                use: cssLoaders()
            },
            {
                test: /\.less$/,
                use: cssLoaders('less-loader')
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: ['csv-loader']
            }
        ]
    }
}