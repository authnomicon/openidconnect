exports = module.exports = function() {
  var path = require('path')
    , ejs = require('ejs');
  
    // WIP: Set jsState cookie in session manager, plumb it through here
  
  function render(req, res, next) {
    // NOTE: This will include locals for state.
    res.render('openidconnect/session/check', function(err, str) {
      if (err && err.view) {
        var view = path.resolve(__dirname, '../views/check.ejs');
        ejs.renderFile(view, res.locals, function(err, str) {
          if (err) { return next(err); }
          res.send(str);
        });
        return;
      } else if (err) {
        return next(err);
      }
      res.send(str);
    });
  }
  
  
  return [
    render
  ];
};

exports['@require'] = [
];
