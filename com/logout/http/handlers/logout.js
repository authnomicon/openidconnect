exports = module.exports = function(idts, authenticate, state, session) {
  
  // TODO: post_logout_redirect_uri.  id_token_hint required when using this
  // TODO: state
  
  function verifyIDToken(req, res, next) {
    if (!req.query.id_token_hint) { return next(); }
    
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
    session(),
    state({ external: true }),
    authenticate('anonymous'),
    verifyIDToken,
    logout
  ];
};

exports['@require'] = [
  '../../../sts/id',
  'http://i.bixbyjs.org/http/middleware/authenticate',
  'http://i.bixbyjs.org/http/middleware/state',
  'http://i.bixbyjs.org/http/middleware/session'
];
