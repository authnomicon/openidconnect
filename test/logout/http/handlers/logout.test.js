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
    var idTokenService = new Object();
    var authenticateSpy = sinon.spy(authenticate);
    var stateSpy = sinon.spy(state);
    var sessionSpy = sinon.spy(session);
    
    var handler = factory(idTokenService, authenticateSpy, stateSpy, sessionSpy);
    
    expect(sessionSpy).to.be.calledOnce;
    expect(stateSpy).to.be.calledOnce;
    expect(stateSpy).to.be.calledAfter(sessionSpy);
    expect(authenticateSpy).to.be.calledOnce;
    expect(authenticateSpy).to.be.calledAfter(stateSpy);
  });
  
});
