exports = module.exports = function(acs) {
  
  return function issueIDToken(client, user, ares, areq, bound, cb) {
    // TODO: Include auth_time when max_age is sent
    // TODO: Add nonce if in request
    
    // http://openid.net/specs/openid-connect-core-1_0.html, Section 2
    
    
    var bound = {
      client: client,
      redirectURI: redirectURI,
      user: user,
      service: info.service,
      grant: info.grant,
      scope: ares.scope
    };
    
    /*
    acs.store(bound, function(err, code) {
      if (err) { return cb(err); }
      return cb(null, code);
    });
    */
  };
};

exports['@require'] = [ 'http://schemas.modulate.io/js/aaa/oauth2/ACS' ];
