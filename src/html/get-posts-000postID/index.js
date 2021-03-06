var arc = require('@architect/functions')
var data = require('@architect/arc-example-microblog-data')
var tmpl = require('@architect/arc-example-microblog-theme')
var post = require('@architect/arc-example-microblog-theme/post')

function route(req, res) {
  var layout = tmpl.bind({}, req)
  data.posts.get({
    postID: req.params.postID, 
    authorID: process.env.GITHUB_LOGIN
  },
  function _get(err, result) {
    if (err) {
      res(err)
    }
    else {
      res({
        html: layout(post(result))
      })
    }
  })
}

exports.handler = arc.html.get(route)
