exports = module.exports = function() {
  var path = require('path')
    , ejs = require('ejs');
  
  
  function respond(req, res) {
    var filename = path.join(__dirname, '../../../www/session/iframe.html.ejs');
    ejs.renderFile(filename, res.locals, function(err, html) {
      if (err) { return next(err); }
      return res.send(html);
    });
  }
  
  
  return [
    respond
  ];
};

exports['@require'] = [];
