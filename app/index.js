exports = module.exports = {
  'implicit/idtoken': require('./implicit/idtoken'),
  'implicit/idtokentoken': require('./implicit/idtokentoken'),
};

exports.load = function(id) {
  try {
    return require('./' + id);
  } catch (ex) {
    if (ex.code == 'MODULE_NOT_FOUND') { return; }
    throw ex;
  }
};
