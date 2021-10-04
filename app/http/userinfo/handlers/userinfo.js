exports = module.exports = function(authenticate, users) {
  return [
    authenticate([ 'bearer' ]),
    function(req, res, next) {
      users.read(req.user.id, function(err, user) {
        // TODO: Respect scope here
        if (err) { return next(err); }
        
        var claims = {
          sub: user.id
        };
        
        claims.name = user.displayName;
        claims.preferred_username = user.username;
        
        res.json(claims);
      });
    }
  ];
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/middleware/authenticate',
  'http://i.authnomicon.org/ds/UserDirectory'
];
