/* global describe, it, expect */

var expect = require('chai').expect;
var chai = require('chai');
var sinon = require('sinon');
var factory = require('../../../../com/logout/http/handlers/logout');


describe('logout/http/handlers/logout', function() {
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.be.undefined;
    expect(factory['@singleton']).to.be.undefined;
  });
  
  
  function authenticate() {
    return function(req, res, next) {
      next();
    };
  }
  
  function state() {
    return function(req, res, next) {
      next();
    };
  }
  
  function session() {
    return function(req, res, next) {
      next();
    };
  }
  
  it('should create handler', function() {
    var service = function(){};
    var idTokenService = new Object();
    var clientDirectory = new Object();
    var authenticateSpy = sinon.spy(authenticate);
    var stateSpy = sinon.spy(state);
    var sessionSpy = sinon.spy(session);
    
    var handler = factory(service, idTokenService, clientDirectory, authenticateSpy, stateSpy, sessionSpy);
    
    expect(sessionSpy).to.be.calledOnce;
    expect(stateSpy).to.be.calledOnce;
    expect(stateSpy).to.be.calledWithExactly({ external: true });
    expect(stateSpy).to.be.calledAfter(sessionSpy);
    expect(authenticateSpy).to.be.calledOnce;
    expect(authenticateSpy).to.be.calledWithExactly('anonymous');
    expect(authenticateSpy).to.be.calledAfter(stateSpy);
  });
  
  describe('handler', function() {
    
    it('should redirect back to relying party', function(done) {
      function service(req, res) {
        expect(req.client).to.deep.equal({
          id: 's6BhdRkqt3',
          name: 'My Example',
          postLogoutRedirectURIs: [ 'https://client.example.org/logout/cb' ]
        });
        
        res.logout();
      }
      
      var idTokenService = new Object();
      idTokenService.verify = sinon.stub().yieldsAsync(null, {
        issuer: 'https://server.example.com',
        user: { id: '248289761001' },
        client: { id: 's6BhdRkqt3' },
        authContext: { sessionID: '08a5019c-17e1-4977-8f42-65a12843ea02' },
        expires: new Date(1311288170 * 1000),
        issued: new Date(1311280970 * 1000)
      });
      var clientDirectory = new Object();
      var clientDirectory = new Object();
      clientDirectory.read = sinon.stub().yieldsAsync(null, {
        id: 's6BhdRkqt3',
        name: 'My Example',
        postLogoutRedirectURIs: [ 'https://client.example.org/logout/cb' ]
      });
      
      var handler = factory(service, idTokenService, clientDirectory, authenticate, state, session);
      
      chai.express.use(handler)
        .request(function(req, res) {
          req.state = new Object();
          req.state.complete = sinon.spy();
          req.logout = sinon.spy();
          
          req.query = {
            id_token_hint: 'eyJhbGci',
            post_logout_redirect_uri: 'https://client.example.org/logout/cb'
          };
          req.sessionID = '08a5019c-17e1-4977-8f42-65a12843ea02';
        })
        .finish(function() {
          expect(idTokenService.verify).to.be.calledOnce;
          expect(idTokenService.verify).to.be.calledWith('eyJhbGci');
          expect(clientDirectory.read).to.be.calledOnce;
          expect(clientDirectory.read).to.be.calledWith('s6BhdRkqt3');
          expect(this.req.logout).to.be.calledOnce;
          expect(this.req.state.complete).to.be.calledOnce;
          
          expect(this.statusCode).to.equal(302);
          expect(this.getHeader('Location')).to.equal('https://client.example.org/logout/cb');
          done();
        })
        .next(done)
        .listen();
    }); // should redirect back to relying party
    
    it('should redirect back to relying party with state', function(done) {
      function service(req, res) {
        expect(req.client).to.deep.equal({
          id: 's6BhdRkqt3',
          name: 'My Example',
          postLogoutRedirectURIs: [ 'https://client.example.org/logout/cb' ]
        });
        
        res.logout();
      }
      
      var idTokenService = new Object();
      idTokenService.verify = sinon.stub().yieldsAsync(null, {
        issuer: 'https://server.example.com',
        user: { id: '248289761001' },
        client: { id: 's6BhdRkqt3' },
        authContext: { sessionID: '08a5019c-17e1-4977-8f42-65a12843ea02' },
        expires: new Date(1311288170 * 1000),
        issued: new Date(1311280970 * 1000)
      });
      var clientDirectory = new Object();
      var clientDirectory = new Object();
      clientDirectory.read = sinon.stub().yieldsAsync(null, {
        id: 's6BhdRkqt3',
        name: 'My Example',
        postLogoutRedirectURIs: [ 'https://client.example.org/logout/cb' ]
      });
      
      var handler = factory(service, idTokenService, clientDirectory, authenticate, state, session);
      
      chai.express.use(handler)
        .request(function(req, res) {
          req.state = new Object();
          req.state.complete = sinon.spy();
          req.logout = sinon.spy();
          
          req.query = {
            id_token_hint: 'eyJhbGci',
            post_logout_redirect_uri: 'https://client.example.org/logout/cb',
            state: 'af0ifjsldkj'
          };
          req.sessionID = '08a5019c-17e1-4977-8f42-65a12843ea02';
        })
        .finish(function() {
          expect(idTokenService.verify).to.be.calledOnce;
          expect(idTokenService.verify).to.be.calledWith('eyJhbGci');
          expect(clientDirectory.read).to.be.calledOnce;
          expect(clientDirectory.read).to.be.calledWith('s6BhdRkqt3');
          expect(this.req.logout).to.be.calledOnce;
          expect(this.req.state.complete).to.be.calledOnce;
          
          expect(this.statusCode).to.equal(302);
          expect(this.getHeader('Location')).to.equal('https://client.example.org/logout/cb?state=af0ifjsldkj');
          done();
        })
        .next(done)
        .listen();
    }); // should redirect back to relying party with state
    
  }); // handler
  
});
