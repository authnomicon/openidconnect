/* global describe, it */

var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../app/implicit/idtoken');


describe('implicit/idtoken', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('http://schemas.authnomicon.org/js/aaa/oauth2/grant');
    expect(factory['@type']).to.equal('id_token');
  });
  
});
