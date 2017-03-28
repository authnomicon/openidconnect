exports = module.exports = function(Tokens) {
  
  return function issueIDToken(client, user, ares, areq, bound, locals, cb) {
    // TODO: Include auth_time when max_age is sent
    // TODO: Add nonce if in request
    // TODO: `none` alg is allowable in `code` exchanges, if client selects it
    //       when registering, secion 2
    
    // http://openid.net/specs/openid-connect-core-1_0.html, Section 2
    
    var ctx = {};
    ctx.user = user;
    ctx.client = client;
    //ctx.audience = [ client ];
    // TODO: scope
    
    // TODO: What is the best policy here?
    var exp = new Date();
    exp.setHours(exp.getHours() + 2);
    ctx.expiresAt = exp;
    
    if (areq.nonce !== undefined) {
      ctx.nonce = areq.nonce;
    }
    // TODO: Handle maxAge
    /*
    if (areq.maxAge !== undefined) {
      claims.authenticatedAt = locals.authenticatedAt;
    }
    */
    // TODO: at_hash per section 3.1.3.6
    
    Tokens.cipher(ctx, { type: 'application/jwt', dialect: 'urn:ietf:params:oauth:token-type:id_token' }, function(err, token) {
      if (err) { return cb(err); }
      return cb(null, token);
    });
  };
};

exports['@require'] = [ 'http://i.bixbyjs.org/tokens' ];
