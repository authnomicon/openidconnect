/* global describe, it, expect */

var expect = require('chai').expect;
var sinon = require('sinon');


describe('@authnomicon/openidconnect', function() {
  
  describe('package.json', function() {
    var json = require('../package.json');
    
    it('should have assembly metadata', function() {
      expect(json.assembly.namespace).to.equal('org.authnomicon/openidconnect');
      expect(json.assembly.components).to.deep.equal([
        'oauth2/authorize/http/request/openid',
        'oauth2/authorize/http/response/idtoken',
        'oauth2/authorize/http/response/codetoken',
        'oauth2/authorize/http/response/codeidtoken',
        'oauth2/authorize/http/response/idtokentoken',
        'oauth2/authorize/http/response/codeidtokentoken',
        'oauth2/token/http/response/idtoken',
        'userinfo/http/service',
        'logout/http/service'
      ]);
    });
  });
  
  it('should throw if required', function() {
    expect(function() {
      var pkg = require('..');
    }).to.throw(Error).with.property('code', 'MODULE_NOT_FOUND');
  });
  
});

afterEach(function() {
  sinon.restore();
});
