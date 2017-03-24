exports = module.exports = function() {
  
  // http://openid.net/specs/openid-connect-session-1_0.html
  function respond(req, res) {
    // TODO:
    res.send('LOGOUT')
  }
  
  
  return [
    respond
  ];
};

exports['@require'] = [];
