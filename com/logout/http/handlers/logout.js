exports = module.exports = function() {
  return [
    function(req, res, next) {
      console.log('!!! LOGOUT !!!');
      console.log(req.query);
      console.log(req.session);
      
      
    }
  ];
};

exports['@require'] = [
];
