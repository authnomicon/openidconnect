exports = module.exports = function(issueIdTokenCb, issueTokenCb, issueCodeCb) {
  var openid = require('oauth2orize-openid');
  
  // TODO: Make modes pluggable
  return openid.grant.codeIdTokenToken({
    modes: {
      form_post: require('oauth2orize-fprm'),
      web_message: require('oauth2orize-wmrm')
    }
  }, issueTokenCb, issueCodeCb, issueIdTokenCb);
};

exports['@implements'] = 'http://schema.modulate.io/js/aaa/oauth2/Response';
exports['@type'] = 'code id_token token';
exports['@require'] = [
  './idtoken/issuecb',
  'http://schema.modulate.io/js/aaa/oauth2/issueTokenFunc',
  'http://schema.modulate.io/js/aaa/oauth2/issueCodeFunc'
];
