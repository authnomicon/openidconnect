exports = module.exports = function(parseCookies, errorLogging) {
  
  function respond(req, res, next) {
    // TODO:
    
    console.log(req.headers);
    console.log(req.query);
    
    console.log(req.body);
    
    console.log(req.cookies)
    
    
    
    
    res.send('SETUP!')
  }
  
  
  return [
    parseCookies(),
    respond,
    errorLogging()
  ];
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/middleware/parseCookies',
  'http://i.bixbyjs.org/http/middleware/errorLogging'
];
