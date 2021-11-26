/* global describe, it */

var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../com/sts/id/default');


describe('sts/id/default', function() {
  
  it('should be annotated', function() {
    expect(factory['@singleton']).to.be.true;
  });
  
});
