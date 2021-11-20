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
        
        if (user.username) { claims.preferred_username = user.username; }
        if (user.displayName) { claims.name = user.displayName; }
        if (user.name) {
          if (user.name.familyName) { claims.family_name = user.name.familyName; }
          if (user.name.givenName) { claims.given_name = user.name.givenName; }
          if (user.name.middleName) { claims.middle_name = user.name.middleName; }
        }
        
        res.json(claims);
      });
    }
  ];
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/middleware/authenticate',
  'http://i.authnomicon.org/Directory'
];
