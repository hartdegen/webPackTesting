export default class Post {
    constructor(title) {
        this.title = title
        this.date = new Date()
    }
    toString() {
        return JSON.stringify({
            thisLoL: this.title,
            dateLoL: this.date
        })
    }
    get uppercaseTitle() {
        return this.title.toUpperCase()
    }
}