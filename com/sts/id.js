exports = module.exports = function(C) {
  
  return C.create('http://i.authnomicon.org/openidconnect/IDTokenService')
    .catch(function(error) {
      if (error.code == 'IMPLEMENTATION_NOT_FOUND' && error.interface == 'http://i.authnomicon.org/openidconnect/IDTokenService') {
        return C.create('./id/default');
      }
      
      throw error;
    });
};

exports['@singleton'] = true;
exports['@require'] = [
  '!container',
];
