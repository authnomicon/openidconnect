/* global describe, it */

var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../../../app/oauth2/authorize/http/response/codeidtoken');


describe('hybrid/codeidtoken', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('http://schemas.authnomicon.org/js/oauth2/responseType');
    expect(factory['@type']).to.equal('code id_token');
  });
  
});
