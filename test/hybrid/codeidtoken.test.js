/* global describe, it */

var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../app/hybrid/codeidtoken');


describe('response/codeidtoken', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
});
