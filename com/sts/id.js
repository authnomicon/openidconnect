exports = module.exports = function(IoC) {
  
  
  return IoC.create('http://i.authnomicon.org/openidconnect/IDTokenService')
    .catch(function(err) {
      
      return {
        issue: function(ctx, cb) {
          console.log('TODO: issue ID token...');
          console.log(ctx);
          
          return cb(null, 'TODO-id_token');
        }
      };
    });
};

exports['@singleton'] = true;
exports['@require'] = [
  '!container',
];
