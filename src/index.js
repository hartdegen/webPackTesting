import Post from './post'
import json from './assets/json'
import imgWebPack from './assets/iconWP.png'
import './styles/styles.css'

const post = new Post('Webpack Omegalul', imgWebPack)
console.log('Post to string', post.toString())
console.log('that is JSON:', json)