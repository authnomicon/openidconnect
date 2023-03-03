exports = module.exports = function() {
  return require('oauth2orize-openid').extensions();
};

exports['@implements'] = 'module:oauth2orize.RequestParametersProcessor';
