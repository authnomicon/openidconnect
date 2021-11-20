exports = module.exports = function(directory, vault, jwt) {
  
  return {
    issue: function(msg, cb) {
      // TODO: Respect scope here.  Don't query directory if scope doesn't need the claims.
      directory.read(msg.user.id, function(err, user) {
        if (err) { return next(err); }
      
        var claims = {
          iss: msg.issuer,
          sub: user.id,
          aud: msg.client.id
        };
        
        if (user.username) { claims.preferred_username = user.username; }
        if (user.displayName) { claims.name = user.displayName; }
        if (user.name) {
          if (user.name.familyName) { claims.family_name = user.name.familyName; }
          if (user.name.givenName) { claims.given_name = user.name.givenName; }
          if (user.name.middleName) { claims.middle_name = user.name.middleName; }
        }
        
        if (msg.expires) { claims.exp = Math.floor(msg.expires.valueOf() / 1000); }
        else { claims.exp = Math.floor(Date.now() / 1000) + 7200; } // 2 hours from now
        if (msg.issued) { claims.iat = Math.floor(msg.issued.valueOf() / 1000); }
        else { claims.iat = Math.floor(Date.now() / 1000); }
      
        vault.get(function(err, publicKey, privateKey) {
          if (err) { return cb(err); }
        
          jwt.sign(claims, privateKey, function(err, token) {
            if (err) { return cb(err); }
            return cb(null, token);
          });
        });
      });
    }
  };
};

exports['@singleton'] = true;
exports['@require'] = [
  'http://i.authnomicon.org/Directory',
  'http://i.authnomicon.org/openidconnect/credentials/KeyVault',
  'http://i.bixbyjs.org/jose/jwt'
];
