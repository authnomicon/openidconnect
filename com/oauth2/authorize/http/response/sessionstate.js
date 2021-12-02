exports = module.exports = function(idts) {
  var url = require('url');
  var crypto = require('crypto');
  var uid = require('uid-safe');
  
  
  return function session_state(txn, cb) {
    var state = txn.res.authContext && txn.res.authContext.sessionState;
    if (!state) { return cb(); }
    
    var uri = url.parse(txn.redirectURI);
    var origin = uri.protocol + '//' + uri.host;
    var salt = uid.sync(16);
    
    var data = txn.client.id + ' ' + origin + ' ' + state + ' ' + salt;
    var ss = crypto
      .createHash('sha256')
      .update(data)
      .digest('hex') + '.' + salt;
    
    cb(null, { session_state: ss });
  }
};

exports['@implements'] = 'http://i.authnomicon.org/oauth2/authorization/http/ResponseParameters';
exports['@require'] = [
  '../../../../sts/id',
];
