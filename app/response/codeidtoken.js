exports = module.exports = function(issueIdTokenCb, issueCodeCb) {
  var openid = require('oauth2orize-openid');
  
  // TODO: Make modes pluggable
  return openid.grant.codeIdToken({
    modes: {
      form_post: require('oauth2orize-fprm'),
      web_message: require('oauth2orize-wmrm')
    }
  }, issueCodeCb, issueIdTokenCb);
};

exports['@implements'] = 'http://schema.modulate.io/js/aaa/oauth2/Response';
exports['@type'] = 'code id_token';
exports['@require'] = [
  './idtoken/issuecb',
  'http://schema.modulate.io/js/aaa/oauth2/issueCodeFunc'
];
