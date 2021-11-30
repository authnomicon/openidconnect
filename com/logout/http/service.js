exports = module.exports = function(logoutHandler) {
  var express = require('express');
  
  var router = new express.Router();
  router.get('/', logoutHandler);
  router.post('/', logoutHandler);
  
  return router;
};

exports['@implements'] = 'http://i.bixbyjs.org/http/Service';
exports['@path'] = '/openidconnect/logout';
exports['@require'] = [
  './handlers/logout'
];
