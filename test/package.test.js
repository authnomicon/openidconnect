/* global describe, it, expect */

var expect = require('chai').expect;
var pkg = require('..');


describe('@authnomicon/aaa-oauth2-openid', function() {
  
  it('should export manifest', function() {
    expect(pkg).to.be.an('object');
    expect(Object.keys(pkg)).to.have.length(9);
    
    expect(pkg['ext/openid']).to.be.a('function');
    expect(pkg['implicit/idtoken']).to.be.a('function');
    expect(pkg['implicit/idtokentoken']).to.be.a('function');
    expect(pkg['hybrid/codeidtoken']).to.be.a('function');
    expect(pkg['hybrid/codetoken']).to.be.a('function');
    expect(pkg['hybrid/codeidtokentoken']).to.be.a('function');
    expect(pkg['tokens/id/interpret']).to.be.a('function');
    expect(pkg['tokens/id/translate']).to.be.a('function');
  });
  
});
