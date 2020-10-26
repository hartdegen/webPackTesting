const path = require('path'); // модуль для работы с путями
const HTMLWebpackPlugin = require('html-webpack-plugin') // плагин для загрузки HTML-кода
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin') // автоочистка неактуальных файлов

module.exports = {
    context: path.resolve(__dirname, 'src'), //путь, где лежат все исходники приложения
    mode: 'development', // режим по умолчанию, npm run dev - собрать проект в режиме разработки, см скрипты package.json
    entry: {
        main: './index.js', // точка входа, т.е. нужный файл со скриптами
        anal: './anal.js' // точек может быть сколько нужно
    },
    output: { // куда складываем результат работы вебпака
        filename: '[name].[contenthash].js', // когда ВП соберет все файлы, получатся [имяФайлаИзEntry].[contenthash].js
        path: path.resolve(__dirname, 'dist') // путь, куда всё складывается (возвращает строку)
    },
    plugins: [
        new HTMLWebpackPlugin({ //подключение плагина, создает HTML шаблон
            title: 'exploring Webpack', // добавляет тег <Title>, если нет template
            template: './index.html' // загружает HTML-код из файла
        }),
        new CleanWebpackPlugin() // подключение плагина авточистки
    ]
}