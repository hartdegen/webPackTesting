import * as $ from 'jquery'
// * - импорт абсолютного всего из библиотеки в виде $
import Post from '@models/post.js'
import json from './assets/json.json'
import xml from './assets/data.xml'
import csv from './assets/data.csv'
import imgWebPack from '@/assets/iconWP.png'
import './styles/styles.css'

const post = new Post('Webpack Omegalul', imgWebPack)
$('pre').addClass('code').html(post.toString())

console.log('Post to string', post.toString())
console.log('that is JSON:', json)
console.log('that is XML:', xml)
console.log('that is CSV:', csv)