var url = require('url');

exports = module.exports = function() {
  
  function config(req, res, next) {
    // TODO: make this more dynamic against the request
    var issuer = process.env['ISSUER'];
    var conf = {
      issuer: issuer,
      authorization_endpoint: url.resolve(issuer, '/oauth2/authorize'),
      token_endpoint: url.resolve(issuer, '/oauth2/token'),
      userinfo_endpoint: url.resolve(issuer, '/openidconnect/userinfo')
    };
    res.json(conf);
  }
  
  
  return [
    config
  ];
};

exports['@require'] = [];
