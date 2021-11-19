exports = module.exports = function() {
  
  return function id_token(txn, cb) {
    var jwt = 'TODO';
    return cb(null, { id_token: jwt });
  }
};

exports['@implements'] = 'http://i.authnomicon.org/oauth2/token/http/ResponseParameters';
