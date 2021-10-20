exports = module.exports = function(container, issueIdToken, issueToken, logger) {
  var openid = require('oauth2orize-openid');
  
  var modeComps = container.components('http://schemas.authnomicon.org/js/oauth2/responseMode');
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
        logger.info('Loaded response mode for OpenID Connect implicit \"id_token token\" flow: ' + name);
      });
      
      return openid.grant.idTokenToken({
        modes: modes
      }, issueToken, issueIdToken);
    });
};

exports['@implements'] = 'http://schemas.authnomicon.org/js/oauth2/responseType';
exports['@type'] = 'id_token token';
exports['@require'] = [
  '!container',
  './issue',
  'http://schemas.authnomicon.org/js/aaa/oauth2/issueTokenFunc',
  'http://i.bixbyjs.org/Logger'
];
