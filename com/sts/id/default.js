exports = module.exports = function(directory, vault, jwt) {
  
  return {
    issue: function(msg, cb) {
      // TODO: Respect scope here.  Don't query directory if scope doesn't need the claims.
      //.      Maybe not?  Move directory read elsehwere?
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
        if (user.emails && user.emails.length) {
          if (user.emails[0].value) { claims.email = user.emails[0].value; }
        }
        
        if (msg.authContext) {
          if (msg.authContext.sessionID) { claims.sid = msg.authContext.sessionID; }
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
    }, // issue
    
    verify: function(token, cb) {
      vault.get(function(err, publicKey, privateKey) {
        if (err) { return cb(err); }
        
        jwt.verify(token, publicKey, function(err, claims) {
          if (err) { return cb(err); }
          
          var msg = {
            issuer: claims.iss,
            user: { id: claims.sub }
          };
          msg.client = { id: claims.aud };
          
          if (claims.preferred_username) { msg.user.username = claims.preferred_username; }
          if (claims.name) { msg.user.displayName = claims.name; }
          
          if (claims.sid) {
            msg.authContext = {};
            msg.authContext.sessionID = claims.sid;
          }
          
          msg.expires = new Date(claims.exp * 1000);
          msg.issued = new Date(claims.iat * 1000);
          
          return cb(null, msg);
        });
      });
    } // verify
  };
};

exports['@singleton'] = true;
exports['@require'] = [
  'module:@authnomicon/core.Directory',
  'http://i.authnomicon.org/openidconnect/credentials/KeyVault',
  'http://i.bixbyjs.org/jose/jwt'
];
