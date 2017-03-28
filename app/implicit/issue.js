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
    
    Tokens.cipher(ctx, { type: 'application/jwt', dialect: 'urn:ietf:params:oauth:token-type:id_token' }, function(err, token) {
      if (err) { return cb(err); }
      return cb(null, token);
    });
    
    
    
    return;
    
    // TODO: Reimplement below here.
    
    var type = 'urn:ietf:params:oauth:token-type:id_token';
    var params = {};
    params.peer = client;
    // TODO: Supported algs, etc.
    
    var exp = new Date();
    exp.setHours(exp.getHours() + 2);
    
    var claims = {
      subject: user.id,
      audience: client.id,
      authorizedParty: client.id,
      expiresAt: exp
    };
    
    if (areq.nonce !== undefined) {
      claims.nonce = areq.nonce;
    }
    if (areq.maxAge !== undefined) {
      claims.authenticatedAt = locals.authenticatedAt;
    }
    
    // TODO: at_hash per section 3.1.3.6
    
    Tokens.encode(type, claims, params, function(err, token) {
      if (err) { return cb(err); }
      
      return cb(null, token);
    });
    
    /*
    var bound = {
      client: client,
      redirectURI: redirectURI,
      user: user,
      service: info.service,
      grant: info.grant,
      scope: ares.scope
    };
    */
    /*
    acs.store(bound, function(err, code) {
      if (err) { return cb(err); }
      return cb(null, code);
    });
    */
  };
};

exports['@require'] = [ 'http://i.bixbyjs.org/tokens' ];
