exports = module.exports = function(userinfoHandler) {
  var express = require('express');
  
  var router = new express.Router();
  router.get('/', userinfoHandler);
  
  return router;
};

exports['@implements'] = 'http://i.bixbyjs.org/http/Service';
exports['@path'] = '/openidconnect/userinfo';
exports['@require'] = [
  './handlers/userinfo'
];
