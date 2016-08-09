exports = module.exports = function(acs) {
  
  return function issueIDToken(client, user, areq, cb) {
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

exports['@implements'] = 'http://schemas.modulate.io/js/aaa/oauth2/openid/issueIDTokenFunc';
exports['@require'] = [ 'http://schemas.modulate.io/js/aaa/oauth2/ACS' ];
