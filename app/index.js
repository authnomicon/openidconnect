/*
exports = module.exports = {
  'ext/openid': require('./ext/openid'),
  'implicit/idtoken': require('./implicit/idtoken'),
  'implicit/idtokentoken': require('./implicit/idtokentoken'),
  'hybrid/codeidtoken': require('./hybrid/codeidtoken'),
  'hybrid/codetoken': require('./hybrid/codetoken'),
  'hybrid/codeidtokentoken': require('./hybrid/codeidtokentoken'),
  'tokens/id/interpret': require('./tokens/id/interpret'),
  'tokens/id/translate': require('./tokens/id/translate')
};
*/


exports = module.exports = function(id) {
  try {
    return require('./' + id);
  } catch (ex) {
    if (ex.code == 'MODULE_NOT_FOUND') { return; }
    throw ex;
  }
};
