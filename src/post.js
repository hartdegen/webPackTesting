export default class Post {
    constructor(title, img) {
        this.title = title
        this.img = img
        this.date = new Date()
    }
    toString() {
        return JSON.stringify({
            thisLoL: this.title,
            dateLoL: this.date,
            imgLol: this.img
        })
    }
    get uppercaseTitle() {
        return this.title.toUpperCase()
    }
}