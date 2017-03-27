exports = module.exports = {
  'implicit/idtoken': require('./implicit/idtoken'),
  'implicit/idtokentoken': require('./implicit/idtokentoken'),
  'hybrid/codeidtoken': require('./hybrid/codeidtoken'),
  'hybrid/codetoken': require('./hybrid/codetoken'),
  'hybrid/codeidtokentoken': require('./hybrid/codeidtokentoken')
};

exports.load = function(id) {
  try {
    return require('./' + id);
  } catch (ex) {
    if (ex.code == 'MODULE_NOT_FOUND') { return; }
    throw ex;
  }
};
