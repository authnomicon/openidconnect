exports = module.exports = function() {
  return require('oauth2orize-openid').extensions();
};

exports['@implements'] = 'http://i.authnomicon.org/oauth2/authorization/http/RequestParameters';
