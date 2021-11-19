exports = module.exports = function() {
  
  return {
    issue: function(msg, cb) {
      console.log('TODO: issue ID token...');
      console.log(msg);
    
      return cb(null, 'TODO-id_token');
    }
  }
};

exports['@singleton'] = true;
exports['@require'] = [
];
