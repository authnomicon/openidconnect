/* global describe, it */

var expect = require('chai').expect;
var $require = require('proxyquire');
var sinon = require('sinon');
var factory = require('../../../../../com/oauth2/authorize/http/response/idtoken');


describe('oauth2/authorize/http/response/idtoken', function() {
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('http://i.authnomicon.org/oauth2/authorization/http/ResponseType');
    expect(factory['@type']).to.equal('id_token');
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
    
    var idTokenSpy = sinon.stub();
    var factory = $require('../../../../../com/oauth2/authorize/http/response/idtoken', {
      'oauth2orize-openid': {
        grant: { idToken: idTokenSpy }
      }
    });
    
    factory(null, logger, container)
      .then(function(type) {
        expect(idTokenSpy).to.be.calledOnce;
        expect(idTokenSpy).to.be.calledWith({ modes: {} });
        done();
      })
      .catch(done);
  }); // should create response type without response modes
  
  describe('issueIDToken', function() {
    var container = new Object();
    container.components = sinon.stub()
    container.components.withArgs('http://i.authnomicon.org/oauth2/authorization/http/ResponseMode').returns([]);
    container.components.withArgs('http://i.authnomicon.org/oauth2/authorization/http/ResponseParameters').returns([]);
    var idts = new Object();
    
    var idTokenSpy = sinon.stub();
    var factory = $require('../../../../../com/oauth2/authorize/http/response/idtoken', {
      'oauth2orize-openid': {
        grant: { idToken: idTokenSpy }
      }
    });
    
    var issueIDToken;
    
    beforeEach(function(done) {
      idts.issue = sinon.stub().yieldsAsync(null, 'eyJhbGci');
      
      factory(idts, logger, container)
        .then(function(type) {
          issueIDToken = idTokenSpy.getCall(0).args[1];
          done();
        })
        .catch(done);
    });
    
    it('should issue ID token', function(done) {
      var client = {
        id: 's6BhdRkqt3',
        name: 'My Example Client'
      };
      var user = {
        id: '248289761001',
        displayName: 'Jane Doe'
      };
      var ares = {
        allow: true
      }
      var areq = {
        type: 'id_token',
        clientID: 's6BhdRkqt3',
        redirectURI: 'https://client.example.com/cb',
        state: 'xyz'
      }
      
      issueIDToken(client, user, ares, areq, {}, {}, function(err, token) {
        if (err) { return done(err); }
        
        expect(idts.issue.callCount).to.equal(1);
        expect(idts.issue.getCall(0).args[0]).to.deep.equal({
          user: {
            id: '248289761001',
            displayName: 'Jane Doe'
          },
          client: {
            id: 's6BhdRkqt3',
            name: 'My Example Client'
          }
        });
        expect(token).to.equal('eyJhbGci');
        done();
      });
    }); // should issue ID token
    
  }); // issueIDToken
  
});
