/**
 * Simple weblog on Polka.
 * Just view list of all posts and view one.
 *
 * Uses:
 *  - Polka - awesome server
 *  - Mongoose - MongoDB ODM
 *  - Handlebars - {{template_engine}} + layouts
 *  - Dotenv - loads all of .env file into process.env
 *
 * by Ivan Khromov with ❤️, 2018
 */

// We load all of our .env file into process.env
// It's very useful if you are using VCS like Git - .env files may be ignored.
require('dotenv').config()
let port = process.env.PORT === undefined ? 3000 : process.env.PORT
// Require polka:
const polka = require('polka')
const mongoose = require('mongoose')
const app = polka()

// require Post model. Use it like `Post.find()`
const Post = require('./models/post')

mongoose.connect(process.env.DB_DSN)
  .then(() => console.log('~~ We are dancing with MongoDB now! Hooray!'))
  .catch((err) => console.log(err.message))

app.use(require('./engine/handlebars'))

app.get('/', function(req, res) {
  Post.find({}, function(err, posts) {
  if(err) throw err
  res.render('index', {posts: posts})
  })
})

app.get('/post/:id', function(req, res) {
  // Don't do this at production and in real apps.
  // Sanitize parameter and check it by regex!
  Post.findOne({_id: req.params.id}, function(err, post) {
  if(err) throw err
  res.render('view', {post: post})
  })
})

app.listen(port).then(_ => {
  console.log(`~~ Polka running. See dance here: http://localhost:${port}`)
})
