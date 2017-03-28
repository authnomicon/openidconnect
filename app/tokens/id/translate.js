exports = module.exports = function() {
  
  return function translate(ctx, options, cb) {
    var claims = {};
    
    if (ctx.user) {
      claims.sub = ctx.user.id;
    }
    if (ctx.client) {
      claims.aud = ctx.client.id;
    }
    
    if (ctx.csrfToken) {
      // https://tools.ietf.org/html/draft-bradley-oauth-jwt-encoded-state-07
      claims.rfp = ctx.csrfToken;
    }
    
    return cb(null, claims);
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/tokens/translateContextFunc';
exports['@dialect'] = 'urn:ietf:params:oauth:token-type:id_token';
