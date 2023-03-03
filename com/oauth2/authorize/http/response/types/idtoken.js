exports = module.exports = function(idts, logger, C) {
  var openid = require('oauth2orize-openid');
  
  var modeComps = C.components('http://i.authnomicon.org/oauth2/authorization/http/ResponseMode');
  return Promise.all(modeComps.map(function(comp) { return comp.create(); } ))
    .then(function(plugins) {
      var modes = {}
        , name;
      plugins.forEach(function(mode, i) {
        name = modeComps[i].a['@mode'];
        if (name == 'query') {
          // The default response mode of this response type is the fragment
          // encoding.  In accordance with security considerations, this
          // response type must not use query encoding, in order to avoid
          // leaking sensitive information such as access tokens.
          //
          // For more information, refer to:
          // https://openid.net/specs/oauth-v2-multiple-response-types-1_0.html#Security
          return;
        }
        
        modes[name] = mode;
        logger.info('Loaded response mode for OpenID Connect implicit \"id_token\" flow: ' + name);
      });
      
      return openid.grant.idToken({
        modes: modes
      }, function(client, user, ares, areq, bind, locals, cb) {
        var msg = {};
        if (ares.issuer) { msg.issuer = ares.issuer; }
        msg.user = user;
        msg.client = client;
        if (ares.scope) { msg.scope = ares.scope; }
        if (ares.authContext) { msg.authContext = ares.authContext; }
        
        idts.issue(msg, function(err, token) {
          if (err) { return cb(err); }
          return cb(null, token);
        });
      });
    });
};

exports['@implements'] = 'module:oauth2orize.RequestProcessor';
exports['@type'] = 'id_token';
exports['@require'] = [
  '../../../../../sts/id',
  'http://i.bixbyjs.org/Logger',
  '!container'
];
