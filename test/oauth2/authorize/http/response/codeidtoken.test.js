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
  
  describe('issueCode', function() {
    var container = new Object();
    container.components = sinon.stub()
    container.components.withArgs('http://i.authnomicon.org/oauth2/authorization/http/ResponseMode').returns([]);
    container.components.withArgs('http://i.authnomicon.org/oauth2/authorization/http/ResponseParameters').returns([]);
    var acs = new Object();
    
    var codeIdTokenSpy = sinon.stub();
    var factory = $require('../../../../../com/oauth2/authorize/http/response/codeidtoken', {
      'oauth2orize-openid': {
        grant: { codeIdToken: codeIdTokenSpy }
      }
    });
    
    var issueCode;
    
    beforeEach(function(done) {
      acs.issue = sinon.stub().yieldsAsync(null, 'SplxlOBeZQQYbYS6WxSbIA');
      
      factory(null, acs, logger, container)
        .then(function(type) {
          issueCode = codeIdTokenSpy.getCall(0).args[1];
          done();
        })
        .catch(done);
    });
    
    it('should issue authorization code', function(done) {
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
        type: 'code id_token',
        clientID: 's6BhdRkqt3',
        redirectURI: 'https://client.example.com/cb',
        state: 'xyz'
      }
      
      issueCode(client, 'https://client.example.com/cb', user, ares, areq, {}, function(err, code) {
        if (err) { return done(err); }
        
        expect(acs.issue.callCount).to.equal(1);
        expect(acs.issue.getCall(0).args[0]).to.deep.equal({
          client: {
            id: 's6BhdRkqt3',
            name: 'My Example Client'
          },
          redirectURI: 'https://client.example.com/cb',
          user: {
            id: '248289761001',
            displayName: 'Jane Doe'
          }
        });
        expect(code).to.equal('SplxlOBeZQQYbYS6WxSbIA');
        done();
      });
    }); // should issue authorization code
    
    it('should issue authorization code with scope', function(done) {
      var client = {
        id: 's6BhdRkqt3',
        name: 'My Example'
      };
      var user = {
        id: '248289761001',
        displayName: 'Jane Doe'
      };
      var ares = {
        allow: true,
        scope: [ 'openid', 'profile', 'email' ]
      }
      var areq = {
        type: 'code id_token',
        clientID: 's6BhdRkqt3',
        redirectURI: 'https://client.example.org/cb',
        state: 'af0ifjsldkj'
      }
      
      issueCode(client, 'https://client.example.org/cb', user, ares, areq, {}, function(err, code) {
        if (err) { return done(err); }
        
        expect(acs.issue.callCount).to.equal(1);
        expect(acs.issue.getCall(0).args[0]).to.deep.equal({
          client: {
            id: 's6BhdRkqt3',
            name: 'My Example'
          },
          redirectURI: 'https://client.example.org/cb',
          user: {
            id: '248289761001',
            displayName: 'Jane Doe'
          },
          scope: [ 'openid', 'profile', 'email' ]
        });
        expect(code).to.equal('SplxlOBeZQQYbYS6WxSbIA');
        done();
      });
    }); // should issue authorization code with scope
    
  }); // issueCode
  
  describe('issueIDToken', function() {
    var container = new Object();
    container.components = sinon.stub()
    container.components.withArgs('http://i.authnomicon.org/oauth2/authorization/http/ResponseMode').returns([]);
    container.components.withArgs('http://i.authnomicon.org/oauth2/authorization/http/ResponseParameters').returns([]);
    var idts = new Object();
    
    var codeIdTokenSpy = sinon.stub();
    var factory = $require('../../../../../com/oauth2/authorize/http/response/codeidtoken', {
      'oauth2orize-openid': {
        grant: { codeIdToken: codeIdTokenSpy }
      }
    });
    
    var issueIDToken;
    
    beforeEach(function(done) {
      idts.issue = sinon.stub().yieldsAsync(null, 'eyJhbGci');
      
      factory(idts, null, logger, container)
        .then(function(type) {
          issueIDToken = codeIdTokenSpy.getCall(0).args[2];
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
        type: 'code id_token',
        clientID: 's6BhdRkqt3',
        redirectURI: 'https://client.example.com/cb',
        state: 'xyz'
      }
      
      issueIDToken(client, user, ares, areq, {}, {}, function(err, code) {
        if (err) { return done(err); }
        
        expect(idts.issue.callCount).to.equal(1);
        expect(idts.issue.getCall(0).args[0]).to.deep.equal({
          client: {
            id: 's6BhdRkqt3',
            name: 'My Example Client'
          },
          user: {
            id: '248289761001',
            displayName: 'Jane Doe'
          }
        });
        expect(code).to.equal('eyJhbGci');
        done();
      });
    }); // should issue ID token
    
  }); // issueIDToken
  
});
