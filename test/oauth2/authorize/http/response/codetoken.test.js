/* global describe, it */

var expect = require('chai').expect;
var $require = require('proxyquire');
var sinon = require('sinon');
var factory = require('../../../../../com/oauth2/authorize/http/response/codetoken');


describe('oauth2/authorize/http/response/codetoken', function() {
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('http://i.authnomicon.org/oauth2/authorization/http/ResponseType');
    expect(factory['@type']).to.equal('code token');
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
    
    var codeTokenSpy = sinon.stub();
    var factory = $require('../../../../../com/oauth2/authorize/http/response/codetoken', {
      'oauth2orize-openid': {
        grant: { codeToken: codeTokenSpy }
      }
    });
    
    factory(null, null, logger, container)
      .then(function(type) {
        expect(codeTokenSpy).to.be.calledOnce;
        expect(codeTokenSpy).to.be.calledWith({ modes: {} });
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
    
    var codeTokenSpy = sinon.stub();
    var factory = $require('../../../../../com/oauth2/authorize/http/response/codetoken', {
      'oauth2orize-openid': {
        grant: { codeToken: codeTokenSpy }
      }
    });
    
    var issueToken;
    
    beforeEach(function(done) {
      ats.issue = sinon.stub().yieldsAsync(null, '2YotnFZFEjr1zCsicMWpAA');
      
      factory(ats, null, logger, container)
        .then(function(type) {
          issueToken = codeTokenSpy.getCall(0).args[1];
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
        type: 'code token',
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
        name: 'My Example Client'
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
        type: 'code token',
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
            name: 'My Example Client'
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
  
  describe('issueCode', function() {
    var container = new Object();
    container.components = sinon.stub()
    container.components.withArgs('http://i.authnomicon.org/oauth2/authorization/http/ResponseMode').returns([]);
    container.components.withArgs('http://i.authnomicon.org/oauth2/authorization/http/ResponseParameters').returns([]);
    var acs = new Object();
    
    var codeTokenSpy = sinon.stub();
    var factory = $require('../../../../../com/oauth2/authorize/http/response/codetoken', {
      'oauth2orize-openid': {
        grant: { codeToken: codeTokenSpy }
      }
    });
    
    var issueCode;
    
    beforeEach(function(done) {
      acs.issue = sinon.stub().yieldsAsync(null, 'SplxlOBeZQQYbYS6WxSbIA');
      
      factory(null, acs, logger, container)
        .then(function(type) {
          issueCode = codeTokenSpy.getCall(0).args[2];
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
        type: 'code',
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
        name: 'My Example Client'
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
        type: 'code',
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
            name: 'My Example Client'
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
  
});
