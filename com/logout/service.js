exports = module.exports = function(C) {
  
  return C.create('http://i.authnomicon.org/openidconnect/LogoutService')
    .catch(function(error) {
      if (error.code == 'IMPLEMENTATION_NOT_FOUND' && error.interface == 'http://i.authnomicon.org/openidconnect/LogoutService') {
        return function(req, cb) {
          console.log('GOT REQ');
          console.log(req);
          
          
          return cb(null, req.permit());
          
          return cb(null, req.prompt('logout'));
          
          //if (!req.client) { return res.prompt('logout'); }
          //res.logout();
        };
      }
      
      throw error;
    });
};

exports['@singleton'] = true;
exports['@require'] = [
  '!container',
];
