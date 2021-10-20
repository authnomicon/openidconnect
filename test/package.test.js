/* global describe, it, expect */

var expect = require('chai').expect;


describe('@authnomicon/oauth2-openid', function() {
  
  describe('package.json', function() {
    var json = require('../package.json');
    
    it('should have assembly metadata', function() {
      expect(json.assembly.namespace).to.equal('oauth2/openid');
      
      expect(json.assembly.components).to.have.length(1);
      /*
      expect(json.assembly.components).to.include('ext/openid');
      expect(json.assembly.components).to.include('implicit/idtoken');
      expect(json.assembly.components).to.include('implicit/idtokentoken');
      expect(json.assembly.components).to.include('hybrid/codeidtoken');
      expect(json.assembly.components).to.include('hybrid/codetoken');
      expect(json.assembly.components).to.include('hybrid/codeidtokentoken');
      expect(json.assembly.components).to.include('tokens/id/interpret');
      expect(json.assembly.components).to.include('tokens/id/translate');
      */
    });
  });
  
  it('should throw if required', function() {
    expect(function() {
      var pkg = require('..');
    }).to.throw(Error).with.property('code', 'MODULE_NOT_FOUND');
  });
  
});
