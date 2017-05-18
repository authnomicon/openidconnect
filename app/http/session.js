exports = module.exports = function(checkHandler, endHandler) {
  var express = require('express');
  var router = new express.Router();
  
  router.get('/check', checkHandler);
  router.get('/end', endHandler);
  
  return router;
};

exports['@implements'] = 'http://schemas.authnomicon.org/js/aaa/oauth2/openid/http/SessionManagementService';
exports['@require'] = [
  '../handlers/session/check',
  '../handlers/session/end'
];
