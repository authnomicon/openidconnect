/* global describe, it, expect */

var expect = require('chai').expect;
var source = require('..');


describe('nodex-aaa-oauth2-openid', function() {
  
  it('should export manifest', function() {
    expect(source).to.be.an('object');
    expect(source['response/idtoken']).to.be.a('function');
  });
  
});
