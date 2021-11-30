exports = module.exports = function(idts, clients, authenticate, state, session) {
  var url = require('url');
  
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
  
  function validateClient(req, res, next) {
    var postLogoutRedirectURI = req.query.post_logout_redirect_uri;
    var idToken = res.locals.idToken;
    
    clients.read(idToken.client.id, function(err, client) {
      if (err) { return next(err); }
      
      res.locals.postLogoutRedirectURI = postLogoutRedirectURI;
      next();
    });
  }
  
  function logout(req, res, next) {
    var idToken = res.locals.idToken;
    
    if (idToken.authContext.sessionID === req.sessionID) {
      req.logout();
      
      var uri = url.parse(res.locals.postLogoutRedirectURI, true);
      delete uri.search;
      if (req.query.state) { uri.query.state = req.query.state; }
      
      req.state.complete();
      
      var location = url.format(uri);
      return res.redirect(location);
      //res.redirect('/')
      
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
    validateClient,
    logout
  ];
};

exports['@require'] = [
  '../../../sts/id',
  'http://i.authnomicon.org/openidconnect/ClientDirectory',
  'http://i.bixbyjs.org/http/middleware/authenticate',
  'http://i.bixbyjs.org/http/middleware/state',
  'http://i.bixbyjs.org/http/middleware/session'
];
