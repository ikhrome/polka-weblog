/**
 * Export `res.render` as a function for all instances
 * Just use it as you did it in Express:
 *
 * ```js
 * res.render('path/to/file', { name: 'Ivan' })
 * ```
 *
 * And yes, this is middleware!
 */

const fs = require('fs')
const path = require('path')

const handlebars = require('handlebars')
const layouts = require('handlebars-layouts')

/*
 * It's very simple and not flexible example.
 * May be it'll help someone to write renderer
 * for his own needs. Just need to say - CHANGE IT!
 */
module.exports = function(req, res, next) {
  res.render = function(filename, context = {}) {
    let base_path = path.join(__dirname, '..', 'views')
    let file_path = path.join(base_path, `${filename}.hbs`)

    let layout_contents = fs.readFileSync(path.join(base_path, 'layout.hbs'), 'utf8')
    handlebars.registerHelper(layouts(handlebars))
    handlebars.registerPartial('layout', layout_contents);

    let contents = fs.readFileSync(file_path, 'utf8')
    let tpl = handlebars.compile(contents)
    res.end(tpl(context))
  }
  next()
}
