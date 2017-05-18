exports = module.exports = function(initialize, csrfProtection, Tokens) {
  var path = require('path')
    , ejs = require('ejs');
  
  
  function respond(req, res, next) {
    var filename = path.join(__dirname, '../../../../../www/cotc/verifier/iframe.html.ejs');
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
