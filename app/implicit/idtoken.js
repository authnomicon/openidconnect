exports = module.exports = function(issueCb) {
  var openid = require('oauth2orize-openid');
  
  // TODO: Make modes pluggable
  return openid.grant.idToken({
    modes: {
      form_post: require('oauth2orize-fprm'),
      web_message: require('oauth2orize-wmrm')
    }
  }, issueCb);
};

exports['@implements'] = 'http://schema.modulate.io/js/aaa/oauth2/Response';
exports['@type'] = 'id_token';
exports['@require'] = [ './idtoken/issuecb' ];
