exports = module.exports = function(idts, authenticate) {
  
  function verifyIDToken(req, res, next) {
    var idTokenHint = req.query.id_token_hint;
    
    idts.verify(idTokenHint, function(err, msg) {
      if (err) { return next(err); }
      res.locals.idToken = msg;
      next();
    });
  }
  
  function logout(req, res, next) {
    var idToken = res.locals.idToken;
    
    if (idToken.authContext.sessionID === req.sessionID) {
      req.logout();
      res.redirect('/')
      
      // TODO: Async logout in passport
      /*
      return req.logout(function() {
        console.log('LOGGED OUT!');
        res.redirect('/');
      })
      */
    }
  }
  
  return [
    authenticate('anonymous'),
    verifyIDToken,
    logout
  ];
};

exports['@require'] = [
  '../../../sts/id',
  'http://i.bixbyjs.org/http/middleware/authenticate'
];
