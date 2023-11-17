var aaa = require('aaatrio');

exports = module.exports = function(prompts, service, clients, idts, authenticator, store) {
  var url = require('url');
  
  var Request = require('../../../../lib/logout/request')
    , Response = require('../../../../lib/logout/response');
  
  // TODO: post_logout_redirect_uri.  id_token_hint required when using this
  // TODO: state
  
  // TODO: Test case for whn redirect uri is present, but no id token hint
  
  function verifyIDToken(req, res, next) {
    if (!req.query.id_token_hint) { return next('ENORP'); }
    
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
      
      res.locals.client = client;
      res.locals.postLogoutRedirectURI = postLogoutRedirectURI;
      next();
    });
  }
  
  function logout(req, res, next) {
    var idToken = res.locals.idToken;
    
    // TODO: Implement a FederatedSessionManager, and set a logged-out bit accordingly
    
    if (idToken.authContext.sessionID === req.sessionID) {
      next();
      
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
  
  function enorpTrap(err, req, res, next) {
    if (err === 'ENORP') { return next(); }
    return next(err);
  }
  
  function handle(req, res, next) {
    var loreq = new Request(res.locals.client)
      , lores = new Response();
  
    function onprompt(name, options) {
      // FIXME: Merge rather than overwrite
      res.locals = options || {};
      prompts.dispatch(name, req, res, next);
    }
  
    function onlogout(ok) {
      req.logout();
  
      var uri = url.parse(res.locals.postLogoutRedirectURI, true);
      delete uri.search;
      if (req.query.state) { uri.query.state = req.query.state; }
  
      req.state.complete();
  
      var location = url.format(uri);
      return res.redirect(location);
    }
  
    function onend() {
      lores.removeListener('prompt', onprompt);
      lores.removeListener('logout', onlogout);
    }

    lores.once('prompt', onprompt);
    lores.once('logout', onlogout);
    lores.once('end', onend);

    service(loreq, lores);
  }
  
  
  return [
    //state({ external: true }),
    require('flowstate')({ external: true, store: store }),
    // TODO: authenticate session???  probably not because could be logged out, and still want to llow client
    //authenticator.authenticate('anonymous'),
    authenticator.authenticate('session'),
    verifyIDToken,
    validateClient,
    logout,
    enorpTrap,
    handle
  ];
};

exports['@require'] = [
  'http://i.authnomicon.org/prompts/http/Router',
  '../../service',
  'http://i.authnomicon.org/openidconnect/ClientDirectory',
  'module:@authnomicon/openidconnect.IDTokenService',
  'module:passport.Authenticator',
  'module:flowstate.Store'
];
