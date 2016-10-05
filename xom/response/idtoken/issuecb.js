exports = module.exports = function(Tokens) {
  
  return function issueIDToken(client, user, ares, areq, bound, locals, cb) {
    // TODO: Include auth_time when max_age is sent
    // TODO: Add nonce if in request
    // TODO: `none` alg is allowable in `code` exchanges, if client selects it
    //       when registering, secion 2
    
    // http://openid.net/specs/openid-connect-core-1_0.html, Section 2
    
    var type = 'urn:ietf:params:oauth:token-type:id_token';
    var params = {};
    params.peer = client;
    // TODO: Supported algs, etc.
    
    var exp = new Date();
    exp.setHours(exp.getHours() + 2);
    
    var claims = {
      subject: user.id,
      authorizedParty: client.id,
      audience: client.id,
      expiresAt: exp
    };
    
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
