const mongoose = require('mongoose')
const Schema = mongoose.Schema

let postSchema = new Schema({
  title: String,
  content: String,
  published: Date
})

let Post = mongoose.model('Post', postSchema)

module.exports = Post
