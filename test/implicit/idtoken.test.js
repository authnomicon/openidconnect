/* global describe, it */

var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../app/implicit/idtoken');


describe('response/idtoken', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
});
