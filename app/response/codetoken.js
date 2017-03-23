exports = module.exports = function(issueTokenCb, issueCodeCb) {
  var openid = require('oauth2orize-openid');
  
  // TODO: Make modes pluggable
  return openid.grant.codeToken({
    modes: {
      form_post: require('oauth2orize-fprm'),
      web_message: require('oauth2orize-wmrm')
    }
  }, issueTokenCb, issueCodeCb);
};

exports['@implements'] = 'http://schema.modulate.io/js/aaa/oauth2/Response';
exports['@type'] = 'code token';
exports['@require'] = [
  'http://schema.modulate.io/js/aaa/oauth2/issueTokenFunc',
  'http://schema.modulate.io/js/aaa/oauth2/issueCodeFunc'
];
