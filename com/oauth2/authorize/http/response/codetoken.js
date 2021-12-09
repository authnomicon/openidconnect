exports = module.exports = function(ats, acs, logger, C) {
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
        logger.info('Loaded response mode for OpenID Connect hybrid \"code token\" flow: ' + name);
      });
      
      return openid.grant.codeToken({
        modes: modes
      }, function(client, user, ares, areq, locals, cb) {
        var msg = {};
        msg.client = client;
        msg.user = user;
        //msg.grant = ares;
        // TODO: Pass some indicator that this is an implicit flow, so token lifetimes
        //. can be constrained accordingly
        if (ares.scope) { msg.scope = ares.scope; }
        
        ats.issue(msg, function(err, token) {
          if (err) { return cb(err); }
          return cb(null, token);
        });
      }, function(client, redirectURI, user, ares, areq, locals, cb) {
        var msg = {};
        msg.client = client;
        msg.redirectURI = redirectURI;
        msg.user = user;
        //msg.grant = ares;
        if (ares.scope) { msg.scope = ares.scope; }
        
        acs.issue(msg, function(err, code) {
          if (err) { return cb(err); }
          return cb(null, code);
        });
      });
    });
};

exports['@implements'] = 'http://i.authnomicon.org/oauth2/authorization/http/ResponseType';
exports['@type'] = 'code token';
exports['@require'] = [
  'http://i.authnomicon.org/oauth2/AccessTokenService',
  'http://i.authnomicon.org/oauth2/AuthorizationCodeService',
  'http://i.bixbyjs.org/Logger',
  '!container'
];
