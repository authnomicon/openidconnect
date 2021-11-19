exports = module.exports = function(jwt) {
  
  return {
    issue: function(msg, cb) {
      var claims = {
        iss: msg.issuer,
        sub: msg.user.id,
        aud: msg.client.id
      };
      if (msg.expires) { claims.exp = Math.floor(msg.expires.valueOf() / 1000); }
      else { claims.exp = Math.floor(Date.now() / 1000) + 7200; } // 2 hours from now
      if (msg.issued) { claims.iat = Math.floor(msg.issued.valueOf() / 1000); }
      else { claims.iat = Math.floor(Date.now() / 1000); }
      
      jwt.sign(claims, function(err, token) {
        if (err) { return cb(err); }
        return cb(null, token);
      });
    }
  }
};

exports['@singleton'] = true;
exports['@require'] = [
  'http://i.bixbyjs.org/jose/jwt'
];
