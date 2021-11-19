exports = module.exports = function(container, idts, logger) {
  var openid = require('oauth2orize-openid');
  
  var modeComps = container.components('http://i.authnomicon.org/oauth2/authorization/http/ResponseMode');
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
      }, function(client, user, ares, areq, bound, locals, cb) {
        var msg = {};
        msg.client = client;
        msg.user = user;
        
        idts.issue(msg, function(err, token) {
          if (err) { return cb(err); }
          return cb(null, token);
        });
      });
    });
};

exports['@implements'] = 'http://i.authnomicon.org/oauth2/authorization/http/ResponseType';
exports['@type'] = 'id_token';
exports['@require'] = [
  '!container',
  '../../../../sts/id',
  'http://i.bixbyjs.org/Logger'
];
