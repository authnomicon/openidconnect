/* global describe, it */

var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../com/sts/id');


describe('sts/id', function() {
  
  it('should be annotated', function() {
    expect(factory['@singleton']).to.be.true;
  });
  
});
