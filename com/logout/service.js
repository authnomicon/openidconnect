exports = module.exports = function(C) {
  
  return C.create('http://i.authnomicon.org/openidconnect/LogoutService')
    .catch(function(error) {
      if (error.code == 'IMPLEMENTATION_NOT_FOUND' && error.interface == 'http://i.authnomicon.org/openidconnect/LogoutService') {
        return function(req, res) {
          res.logout();
        };
      }
      
      throw error;
    });
};

exports['@singleton'] = true;
exports['@require'] = [
  '!container',
];
