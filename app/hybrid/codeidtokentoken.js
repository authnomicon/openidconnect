exports = module.exports = function(container, issueIdToken, issueToken, issueCode, logger) {
  var openid = require('oauth2orize-openid');
  
  var modeDecls = container.specs('http://schemas.authnomicon.org/js/aaa/oauth2/response/mode');
  return Promise.all(modeDecls.map(function(spec) { return container.create(spec.id); } ))
    .then(function(plugins) {
      var modes = {}
        , name;
      plugins.forEach(function(mode, i) {
        name = modeDecls[i].a['@mode'];
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
        logger.info('Loaded response mode for OpenID Connect hybrid \"code id_token token\" flow: ' + name);
      });
      
      return openid.grant.codeIdTokenToken({
        modes: modes
      }, issueToken, issueCode, issueIdToken);
    });
};

exports['@implements'] = 'http://schemas.authnomicon.org/js/aaa/oauth2/grant';
exports['@type'] = 'code id_token token';
exports['@require'] = [
  '!container',
  '../implicit/issue',
  'http://schemas.authnomicon.org/js/aaa/oauth2/issueTokenFunc',
  'http://schemas.authnomicon.org/js/aaa/oauth2/issueCodeFunc',
  'http://i.bixbyjs.org/Logger'
];
