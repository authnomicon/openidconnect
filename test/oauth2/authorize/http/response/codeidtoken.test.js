/* global describe, it */

var expect = require('chai').expect;
var $require = require('proxyquire');
var sinon = require('sinon');
var factory = require('../../../../../com/oauth2/authorize/http/response/codeidtoken');


describe('oauth2/authorize/http/response/codeidtoken', function() {
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('http://i.authnomicon.org/oauth2/authorization/http/ResponseType');
    expect(factory['@type']).to.equal('code id_token');
  });
  
  
  var logger = {
    emergency: function(){},
    alert: function(){},
    critical: function(){},
    error: function(){},
    warning: function(){},
    notice: function(){},
    info: function(){},
    debug: function(){}
  };
  
  it('should create response type without response modes', function(done) {
    var container = new Object();
    container.components = sinon.stub();
    container.components.withArgs('http://i.authnomicon.org/oauth2/authorization/http/ResponseMode').returns([]);
    container.components.withArgs('http://i.authnomicon.org/oauth2/authorization/http/ResponseParameters').returns([]);
    
    var codeIdTokenSpy = sinon.stub();
    var factory = $require('../../../../../com/oauth2/authorize/http/response/codeidtoken', {
      'oauth2orize-openid': {
        grant: { codeIdToken: codeIdTokenSpy }
      }
    });
    
    factory(null, null, logger, container)
      .then(function(type) {
        expect(codeIdTokenSpy).to.be.calledOnce;
        expect(codeIdTokenSpy).to.be.calledWith({ modes: {} });
        done();
      })
      .catch(done);
  }); // should create response type without response modes
  
});
