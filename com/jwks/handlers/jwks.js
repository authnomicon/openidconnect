var jose = require('jose');

exports = module.exports = function(vault) {
  
  function jwks(req, res, next) {
    var keys = [];
    
    vault.get(function(err, publicKey, privateKey) {
      if (err) { return next(err); }
      
      jose.exportJWK(publicKey)
        .then(function(jwk) {
          jwk.kid = publicKey.id;
          // FIXME: don't hardcode this
          jwk.use = 'sig';
          
          keys.push(jwk)
          res.json({ keys: keys });
        })
        .catch(next);
    });
  }
  
  
  return [
    jwks
  ];
};

exports['@require'] = [
  'http://i.authnomicon.org/openidconnect/credentials/KeyVault'
];
