/* global describe, it */

var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../xom/response/idtoken/issuecb');


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
  
  describe('issueCb', function() {
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
    
    describe('issuing something', function() {
      var idToken;
      
      before(function() {
        sinon.stub(tokens, 'encode').yields(null, '2YotnFZFEjr1zCsicMWpAA');
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
        issueCb(client, user, ares, {}, {}, {}, function(e, i) {
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
          authorizedParty: 's6BhdRkqt3',
          audience: 's6BhdRkqt3'
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
        expect(idToken).to.equal('2YotnFZFEjr1zCsicMWpAA');
      });
    });
    
  });
  
});
