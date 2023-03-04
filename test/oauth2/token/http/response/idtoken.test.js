/* global describe, it */

var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../../../com/oauth2/token/http/response/idtoken');


describe('oauth2/token/http/response/idtoken', function() {
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('module:@authnomicon/oauth2.tokenResponseParametersFn');
    expect(factory['@singleton']).to.be.undefined;
  });
  
  
  it('should extend response with ID token', function(done) {
    var idts = new Object();
    idts.issue = sinon.stub().yieldsAsync(null, 'eyJhbGci');
    
    var msg = {
      user: {
        id: '248289761001'
      },
      client: {
        id: 's6BhdRkqt3',
        name: 'My Example',
        redirectURIs: [ 'https://client.example.org/cb' ]
      },
      scope: [ 'openid', 'profile', 'email' ]
    }
    
    var extend = factory(idts);
    extend(msg, {}, 'authorization_code', function(err, params) {
      if (err) { return done(err); }
      
      expect(idts.issue).to.be.calledOnce;
      expect(idts.issue.getCall(0).args[0]).to.deep.equal({
        user: {
          id: '248289761001'
        },
        client: {
          id: 's6BhdRkqt3',
          name: 'My Example',
          redirectURIs: [ 'https://client.example.org/cb' ]
        },
        scope: [ 'openid', 'profile', 'email' ]
      });
      expect(params).to.deep.equal({ id_token: 'eyJhbGci' });
      done();
    });
  }); // should extend response with ID token
  
  it('should not extend response with ID token when not authorization code grant', function(done) {
    var idts = new Object();
    idts.issue = sinon.stub().yieldsAsync(null, 'eyJhbGci');
    
    var msg = {
      user: {
        id: '248289761001'
      },
      client: {
        id: 's6BhdRkqt3',
        name: 'My Example Client',
        redirectURIs: [ 'https://client.example.com/cb' ]
      }
    }
    
    var extend = factory(idts);
    extend(msg, {}, 'password', function(err, params) {
      if (err) { return done(err); }
      
      expect(idts.issue).to.not.be.called;
      expect(params).to.be.undefined;
      done();
    });
  }); // should not extend response with ID token when not authorization code grant
  
  it('should not extend response with ID token when scope is not present', function(done) {
    var idts = new Object();
    idts.issue = sinon.stub().yieldsAsync(null, 'eyJhbGci');
    
    var msg = {
      user: {
        id: '248289761001'
      },
      client: {
        id: 's6BhdRkqt3',
        name: 'My Example Client',
        redirectURIs: [ 'https://client.example.com/cb' ]
      }
    }
    
    var extend = factory(idts);
    extend(msg, {}, 'authorization_code', function(err, params) {
      if (err) { return done(err); }
      
      expect(idts.issue).to.not.be.called;
      expect(params).to.be.undefined;
      done();
    });
  }); // should not extend response with ID token when scope is not present
  
  it('should not extend response with ID token when openid scope value is not present', function(done) {
    var idts = new Object();
    idts.issue = sinon.stub().yieldsAsync(null, 'eyJhbGci');
    
    var msg = {
      user: {
        id: '248289761001'
      },
      client: {
        id: 's6BhdRkqt3',
        name: 'My Example Client',
        redirectURIs: [ 'https://client.example.com/cb' ]
      },
      scope: [ 'profile', 'email' ]
    }
    
    var extend = factory(idts);
    extend(msg, {}, 'authorization_code', function(err, params) {
      if (err) { return done(err); }
      
      expect(idts.issue).to.not.be.called;
      expect(params).to.be.undefined;
      done();
    });
  }); // should not extend response with ID token when openid scope value is not present
  
});
