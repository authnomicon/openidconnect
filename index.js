exports = module.exports = {
  //'response/idtoken': require('./xom/response/idtoken'),
};

exports.load = function(id) {
  try {
    return require('./app/' + id);
  } catch (ex) {
    if (ex.code == 'MODULE_NOT_FOUND') { return; }
    throw ex;
  }
};
