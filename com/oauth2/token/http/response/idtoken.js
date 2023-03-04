exports = module.exports = function(idts) {
  var merge = require('utils-merge');
  
  // TODO: Eliminate the grant argument here, and make it an annotation.
  return function id_token(msg, bind, grant, cb) {
    if (grant !== 'authorization_code') { return cb(null); }
    if (!msg.scope || msg.scope.indexOf('openid') === -1) { return cb(null); }
    
    var idmsg = merge({}, msg);
    
    // TODO: Bind access token, if available
    
    idts.issue(idmsg, function(err, token) {
      if (err) { return cb(err); }
      return cb(null, { id_token: token });
    });
  }
};

exports['@implements'] = 'module:@authnomicon/oauth2.tokenResponseParametersFn';
exports['@require'] = [
  '../../../../sts/id',
];
