exports = module.exports = function(checkHandler) {
  var express = require('express');
  
  var router = new express.Router();
  router.get('/check', checkHandler);
  
  return router;
};

exports['@implements'] = 'http://i.bixbyjs.org/http/Service';
exports['@path'] = '/openidconnect/session';
exports['@require'] = [
  './handlers/check'
];
