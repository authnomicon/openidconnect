exports = module.exports = function() {
  
  return function interpret(tkn, options, cb) {
    var claims = tkn.claims;
    /*
    if (!claims.sub || !claims.sub) {
      // The claims within this token cannot be interpreted in accordance with the
      // MFA OOB code dialect.
      return cb();
    }
    */
    
    var ctx = {};
    ctx.subject = { id: claims.sub };
    ctx.client = { id: claims.aud };
    
    return cb(null, ctx);
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/tokens/interpretClaimsFunc';
exports['@dialect'] = 'urn:ietf:params:oauth:token-type:id_token';
