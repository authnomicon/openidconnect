exports = module.exports = function(idts) {
  
  return function id_token(txn, cb) {
    var msg = {};
    if (txn.issuer) { msg.issuer = txn.issuer; }
    msg.user = txn.user;
    msg.client = txn.client;
    if (txn.scope) { msg.scope = txn.scope; }
    if (txn.authContext) { msg.authContext = txn.authContext; }
    
    // TODO: Add scope to the message, so user claims can be filtered
    
    idts.issue(msg, function(err, token) {
      if (err) { return cb(err); }
      return cb(null, { id_token: token });
    });
  }
};

exports['@implements'] = 'http://i.authnomicon.org/oauth2/token/http/ResponseParameters';
exports['@require'] = [
  '../../../../sts/id',
];
