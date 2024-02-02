var express = require('express');

exports = module.exports = function(configurationHandler) {
  var router = express.Router();
  router.get('/', configurationHandler);
  
  return router;
};

exports['@implements'] = 'http://i.bixbyjs.org/http/Service';
exports['@path'] = '/.well-known/openid-configuration';
exports['@require'] = [
  './handlers/configuration'
];
