var express = require('express');

exports = module.exports = function(jwksHandler) {
  var router = express.Router();
  router.get('/', jwksHandler);
  
  return router;
};

exports['@implements'] = 'http://i.bixbyjs.org/http/Service';
exports['@path'] = '/openidconnect/jwks';
exports['@require'] = [
  './handlers/jwks'
];
