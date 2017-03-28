/* global describe, it */

var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../app/tokens/id/interpret');


describe('tokens/id/interpret', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('http://i.bixbyjs.org/tokens/interpretClaimsFunc');
    expect(factory['@dialect']).to.equal('urn:ietf:params:oauth:token-type:id_token');
  });
  
});
