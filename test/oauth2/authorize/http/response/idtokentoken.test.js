/* global describe, it */

var expect = require('chai').expect;
var $require = require('proxyquire');
var sinon = require('sinon');
var factory = require('../../../../../com/oauth2/authorize/http/response/idtokentoken');


describe('oauth2/authorize/http/response/idtokentoken', function() {
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('http://i.authnomicon.org/oauth2/authorization/http/ResponseType');
    expect(factory['@type']).to.equal('id_token token');
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
    
    var idTokenTokenSpy = sinon.stub();
    var factory = $require('../../../../../com/oauth2/authorize/http/response/idtokentoken', {
      'oauth2orize-openid': {
        grant: { idTokenToken: idTokenTokenSpy }
      }
    });
    
    factory(null, null, logger, container)
      .then(function(type) {
        expect(idTokenTokenSpy).to.be.calledOnce;
        expect(idTokenTokenSpy).to.be.calledWith({ modes: {} });
        done();
      })
      .catch(done);
  }); // should create response type without response modes
  
  describe('issueToken', function() {
    var container = new Object();
    container.components = sinon.stub()
    container.components.withArgs('http://i.authnomicon.org/oauth2/authorization/http/ResponseMode').returns([]);
    container.components.withArgs('http://i.authnomicon.org/oauth2/authorization/http/ResponseParameters').returns([]);
    var ats = new Object();
    
    var idTokenTokenSpy = sinon.stub();
    var factory = $require('../../../../../com/oauth2/authorize/http/response/idtokentoken', {
      'oauth2orize-openid': {
        grant: { idTokenToken: idTokenTokenSpy }
      }
    });
    
    var issueToken;
    
    beforeEach(function(done) {
      ats.issue = sinon.stub().yieldsAsync(null, '2YotnFZFEjr1zCsicMWpAA');
      
      factory(null, ats, logger, container)
        .then(function(type) {
          issueToken = idTokenTokenSpy.getCall(0).args[1];
          done();
        })
        .catch(done);
    });
    
    it('should issue access token', function(done) {
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
        type: 'id_token token',
        clientID: 's6BhdRkqt3',
        redirectURI: 'https://client.example.com/cb',
        state: 'xyz'
      }
      
      issueToken(client, user, ares, areq, {}, function(err, token) {
        if (err) { return done(err); }
        
        expect(ats.issue.callCount).to.equal(1);
        expect(ats.issue.getCall(0).args[0]).to.deep.equal({
          client: {
            id: 's6BhdRkqt3',
            name: 'My Example Client'
          },
          user: {
            id: '248289761001',
            displayName: 'Jane Doe'
          }
        });
        expect(token).to.equal('2YotnFZFEjr1zCsicMWpAA');
        done();
      });
    }); // should issue access token
    
    it('should issue access token with scope', function(done) {
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
        type: 'id_token token',
        clientID: 's6BhdRkqt3',
        redirectURI: 'https://client.example.org/cb',
        state: 'af0ifjsldkj'
      }
      
      issueToken(client, user, ares, areq, {}, function(err, token) {
        if (err) { return done(err); }
        
        expect(ats.issue.callCount).to.equal(1);
        expect(ats.issue.getCall(0).args[0]).to.deep.equal({
          client: {
            id: 's6BhdRkqt3',
            name: 'My Example'
          },
          user: {
            id: '248289761001',
            displayName: 'Jane Doe'
          },
          scope: [ 'openid', 'profile', 'email' ]
        });
        expect(token).to.equal('2YotnFZFEjr1zCsicMWpAA');
        done();
      });
    }); // should issue access token with scope
    
  }); // issueToken
  
  describe('issueIDToken', function() {
    var container = new Object();
    container.components = sinon.stub()
    container.components.withArgs('http://i.authnomicon.org/oauth2/authorization/http/ResponseMode').returns([]);
    container.components.withArgs('http://i.authnomicon.org/oauth2/authorization/http/ResponseParameters').returns([]);
    var idts = new Object();
    
    var idTokenTokenSpy = sinon.stub();
    var factory = $require('../../../../../com/oauth2/authorize/http/response/idtokentoken', {
      'oauth2orize-openid': {
        grant: { idTokenToken: idTokenTokenSpy }
      }
    });
    
    var issueIDToken;
    
    beforeEach(function(done) {
      idts.issue = sinon.stub().yieldsAsync(null, 'eyJhbGci');
      
      factory(idts, null, logger, container)
        .then(function(type) {
          issueIDToken = idTokenTokenSpy.getCall(0).args[2];
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
        type: 'id_token token',
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
