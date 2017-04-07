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
    ctx.csrfToken = claims.rfp;
    
    if (claims.cnf) {
      ctx.confirmation = [];
      
      keys = Object.keys(claims.cnf);
      for (i = 0, len = keys.length; i < len; ++i) {
        key = keys[i];
       
        switch (key) {
        case 'co_challenge':
          ctx.confirmation.push({
            method: 'cross-origin',
            origin: claims.cnf.co_origin,
            challenge: claims.cnf.co_challenge,
            transform: claims.cnf.co_challenge_method || 'none'
          });
          break;
        case 'co_origin':
          break;
        default:
          ctx.confirmation.push({ method: 'unknown', name: key });
          break;
        }
      }
    }
    
    return cb(null, ctx);
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/tokens/interpretClaimsFunc';
exports['@dialect'] = 'urn:ietf:params:oauth:token-type:id_token';
