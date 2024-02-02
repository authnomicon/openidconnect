exports = module.exports = function(authenticator, users) {
  return [
    authenticator.authenticate([ 'bearer' ]),
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
        if (user.emails && user.emails.length) {
          if (user.emails[0].value) { claims.email = user.emails[0].value; }
        }
        
        res.json(claims);
      });
    }
  ];
};

exports['@require'] = [
  'module:passport.Authenticator',
  'module:@authnomicon/core.Directory'
];
