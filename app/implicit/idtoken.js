exports = module.exports = function(container, issue, logger) {
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
        logger.info('Loaded response mode for OpenID Connect implicit \"id_token\" flow: ' + name);
      });
      
      return openid.grant.idToken({
        modes: modes
      }, issue);
    });
};

exports['@implements'] = 'http://schemas.authnomicon.org/js/aaa/oauth2/grant';
exports['@type'] = 'id_token';
exports['@require'] = [
  '!container',
  './issue',
  'http://i.bixbyjs.org/Logger'
];
