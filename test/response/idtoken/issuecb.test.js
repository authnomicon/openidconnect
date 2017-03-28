/* global describe, it */

var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../app/implicit/issue');

var ID_TOKEN_FROM_SPEC = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjFlOWdkazcifQ.ewogImlzc\
yI6ICJodHRwOi8vc2VydmVyLmV4YW1wbGUuY29tIiwKICJzdWIiOiAiMjQ4Mjg5\
NzYxMDAxIiwKICJhdWQiOiAiczZCaGRSa3F0MyIsCiAibm9uY2UiOiAibi0wUzZ\
fV3pBMk1qIiwKICJleHAiOiAxMzExMjgxOTcwLAogImlhdCI6IDEzMTEyODA5Nz\
AKfQ.ggW8hZ1EuVLuxNuuIJKX_V8a_OMXzR0EHR9R6jgdqrOOF4daGU96Sr_P6q\
Jp6IcmD3HP99Obi1PRs-cwh3LO-p146waJ8IhehcwL7F09JdijmBqkvPeB2T9CJ\
NqeGpe-gccMg4vfKjkM8FcGvnzZUN4_KSP0aAp1tOJ1zZwgjxqGByKHiOtX7Tpd\
QyHE5lcMiKPXfEIQILVq0pc_E2DzL7emopWoaoZTF_m0_N0YzFC6g6EJbOEoRoS\
K5hoDalrcvRYLSrQAZZKflyuVCyixEoV9GfNQC3_osjzw2PAithfubEEBLuVVk4\
XUVrWOLrLl0nx7RkKU8NXNHq-rvKMzqg'


describe('response/idtoken/issuecb', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  describe('factory', function() {
    var func = factory();
    
    it('should return function', function() {
      expect(func).to.be.a('function');
    });
  });
  
  describe.skip('issueCb', function() {
    var client = {
      id: 's6BhdRkqt3',
      name: 'Example Client'
    }
    var user = {
      id: '1',
      displayName: 'John Doe'
    };
    
    var tokens = {
      encode: function(){},
      negotiate: function(){}
    };
    
    describe('issuing a token', function() {
      var idToken;
      
      before(function() {
        sinon.stub(tokens, 'encode').yields(null, ID_TOKEN_FROM_SPEC);
      });
      
      after(function() {
        tokens.encode.restore();
      });
      
      before(function(done) {
        var ares = {
          allow: true,
          access: [ {
            resource: 'https://api.example.com/',
            scope: [ 'read:foo', 'write:foo', 'read:bar' ]
          } ]
        }
        
        var issueCb = factory(tokens);
        issueCb(client, user, ares, {}, undefined, {}, function(e, i) {
          if (e) { return done(e); }
          idToken = i;
          done();
        });
      });
      
      it('should call tokens.encode', function() {
        expect(tokens.encode).to.have.been.calledOnce;
        var call = tokens.encode.getCall(0);
        expect(call.args[0]).to.equal('urn:ietf:params:oauth:token-type:id_token');

        var claims = call.args[1];
        var expiresAt = claims.expiresAt;
        delete claims.expiresAt;
        
        expect(call.args[1]).to.deep.equal({
          subject: '1',
          audience: 's6BhdRkqt3',
          authorizedParty: 's6BhdRkqt3'
        });
        
        expect(expiresAt).to.be.an.instanceOf(Date);
        var expectedExpiresAt = new Date();
        expectedExpiresAt.setHours(expectedExpiresAt.getHours() + 2);
        expect(expiresAt).to.be.closeToDate(expectedExpiresAt, 2, 'seconds');

        expect(call.args[2]).to.deep.equal({
          peer: {
            id: 's6BhdRkqt3',
            name: 'Example Client'
          }
        });
      });
      
      it('should yield an ID token', function() {
        expect(idToken).to.equal(ID_TOKEN_FROM_SPEC);
      });
    }); // issuing a token
    
    describe('issuing a token in response to request with nonce', function() {
      var idToken;
      
      before(function() {
        sinon.stub(tokens, 'encode').yields(null, ID_TOKEN_FROM_SPEC);
      });
      
      after(function() {
        tokens.encode.restore();
      });
      
      before(function(done) {
        var ares = {
          allow: true,
          access: [ {
            resource: 'https://api.example.com/',
            scope: [ 'read:foo', 'write:foo', 'read:bar' ]
          } ]
        }
        var areq = {
          nonce: 'n-0S6_WzA2Mj'
        }
        
        var issueCb = factory(tokens);
        issueCb(client, user, ares, areq, undefined, {}, function(e, i) {
          if (e) { return done(e); }
          idToken = i;
          done();
        });
      });
      
      it('should call tokens.encode', function() {
        expect(tokens.encode).to.have.been.calledOnce;
        var call = tokens.encode.getCall(0);
        expect(call.args[0]).to.equal('urn:ietf:params:oauth:token-type:id_token');

        var claims = call.args[1];
        var expiresAt = claims.expiresAt;
        delete claims.expiresAt;
        
        expect(call.args[1]).to.deep.equal({
          subject: '1',
          audience: 's6BhdRkqt3',
          authorizedParty: 's6BhdRkqt3',
          nonce: 'n-0S6_WzA2Mj'
        });
        
        expect(expiresAt).to.be.an.instanceOf(Date);
        var expectedExpiresAt = new Date();
        expectedExpiresAt.setHours(expectedExpiresAt.getHours() + 2);
        expect(expiresAt).to.be.closeToDate(expectedExpiresAt, 2, 'seconds');

        expect(call.args[2]).to.deep.equal({
          peer: {
            id: 's6BhdRkqt3',
            name: 'Example Client'
          }
        });
      });
      
      it('should yield an ID token', function() {
        expect(idToken).to.equal(ID_TOKEN_FROM_SPEC);
      });
    }); // issuing a token in response to request with nonce
    
    describe('issuing a token in response to max_age request', function() {
      var idToken;
      
      before(function() {
        sinon.stub(tokens, 'encode').yields(null, ID_TOKEN_FROM_SPEC);
      });
      
      after(function() {
        tokens.encode.restore();
      });
      
      before(function(done) {
        var ares = {
          allow: true,
          access: [ {
            resource: 'https://api.example.com/',
            scope: [ 'read:foo', 'write:foo', 'read:bar' ]
          } ]
        };
        var areq = {
          maxAge: 3600
        }
        var locals = {
          authenticatedAt: new Date(2016, 10, 5, 8, 10)
        }
        
        var issueCb = factory(tokens);
        issueCb(client, user, ares, areq, undefined, locals, function(e, i) {
          if (e) { return done(e); }
          idToken = i;
          done();
        });
      });
      
      it('should call tokens.encode', function() {
        expect(tokens.encode).to.have.been.calledOnce;
        var call = tokens.encode.getCall(0);
        expect(call.args[0]).to.equal('urn:ietf:params:oauth:token-type:id_token');

        var claims = call.args[1];
        var expiresAt = claims.expiresAt;
        delete claims.expiresAt;
        var authenticatedAt = claims.authenticatedAt;
        delete claims.authenticatedAt;
        
        expect(call.args[1]).to.deep.equal({
          subject: '1',
          audience: 's6BhdRkqt3',
          authorizedParty: 's6BhdRkqt3'
        });
        
        expect(expiresAt).to.be.an.instanceOf(Date);
        var expectedExpiresAt = new Date();
        expectedExpiresAt.setHours(expectedExpiresAt.getHours() + 2);
        expect(expiresAt).to.be.closeToDate(expectedExpiresAt, 2, 'seconds');
        
        expect(authenticatedAt).to.be.an.instanceOf(Date);
        var expectedAuthenticatedAt = new Date(2016, 10, 5, 8, 10);
        expect(authenticatedAt).to.be.closeToDate(expectedAuthenticatedAt);

        expect(call.args[2]).to.deep.equal({
          peer: {
            id: 's6BhdRkqt3',
            name: 'Example Client'
          }
        });
      });
      
      it('should yield an ID token', function() {
        expect(idToken).to.equal(ID_TOKEN_FROM_SPEC);
      });
    }); // issuing a token
    
  });
  
});
