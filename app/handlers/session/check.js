exports = module.exports = function() {
  var path = require('path');
  
  
  function respond(req, res) {
    //res.render('sessioncheck');
    var f = path.join(__dirname, '../../../www/check.html');
    console.log(f);
    
    res.sendFile(f);
  }
  
  
  return [
    respond
  ];
};

exports['@require'] = [];
