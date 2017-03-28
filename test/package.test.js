/* global describe, it, expect */

var expect = require('chai').expect;
var pkg = require('..');


describe('@authnomicon/aaa-oauth2-openid', function() {
  
  it('should export manifest', function() {
    expect(pkg).to.be.an('object');
    expect(pkg['implicit/idtoken']).to.be.a('function');
  });
  
});
