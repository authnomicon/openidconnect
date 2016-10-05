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
      
      it('should yield an access token', function() {
        expect(idToken).to.equal('2YotnFZFEjr1zCsicMWpAA');
      });
    });
    
  });
  
});
