/* global describe, it */

var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../com/idtokenservice');


describe('idtokenservice', function() {
  var clock;
  
  beforeEach(function() {
    clock = sinon.useFakeTimers(1311280970000);
  });
  
  afterEach(function() {
    clock.restore();
  });
  
  
  it('should be annotated', function() {
    expect(factory['@singleton']).to.be.true;
  });
  
  describe('IDTokenService', function() {
    
    describe('#issue', function() {
      
      it('should issue token', function(done) {
        var directory = new Object();
        directory.read = sinon.stub().yieldsAsync(null, {
          id: '248289761001',
          displayName: 'Jane Doe'
        });
        
        var vault = new Object();
        vault.get = sinon.stub().yieldsAsync(null, 'PUBLIC KEY', 'PRIVATE KEY');
        
        var jwt = new Object();
        jwt.sign = sinon.stub().yieldsAsync(null, 'eyJhbGci');
        
        
        var svc = factory(directory, vault, jwt);
        
        var msg = {
          issuer: 'https://server.example.com',
          user: {
            id: '248289761001'
          },
          client: {
            id: 's6BhdRkqt3',
            name: 'Example Client',
            redirectURIs: [ 'https://client.example.org/cb' ]
          },
          scope: [ 'openid', 'profile', 'email' ]
        };
        
        svc.issue(msg, function(err, token) {
          if (err) { return done(err); }
          expect(directory.read).to.be.calledOnce;
          expect(directory.read.getCall(0).args[0]).to.equal('248289761001');
          expect(vault.get).to.be.calledOnce;
          expect(vault.get.getCall(0).args[0]).to.be.a('function');
          expect(jwt.sign).to.be.calledOnce;
          expect(jwt.sign.getCall(0).args[0]).to.deep.equal({
            iss: 'https://server.example.com',
            sub: '248289761001',
            aud: 's6BhdRkqt3',
            name: 'Jane Doe',
            exp: 1311288170,
            iat: 1311280970
          });
          expect(jwt.sign.getCall(0).args[1]).to.equal('PRIVATE KEY');
          expect(token).to.equal('eyJhbGci');
          done();
        });
      }); // should issue token
      
      it('should issue token with email', function(done) {
        var directory = new Object();
        directory.read = sinon.stub().yieldsAsync(null, {
          id: '248289761001',
          displayName: 'Jane Doe',
          emails: [ { value: 'janedoe@example.com' } ]
        });
        
        var vault = new Object();
        vault.get = sinon.stub().yieldsAsync(null, 'PUBLIC KEY', 'PRIVATE KEY');
        
        var jwt = new Object();
        jwt.sign = sinon.stub().yieldsAsync(null, 'eyJhbGci');
        
        
        var svc = factory(directory, vault, jwt);
        
        var msg = {
          issuer: 'https://server.example.com',
          user: {
            id: '248289761001'
          },
          client: {
            id: 's6BhdRkqt3',
            name: 'Example Client',
            redirectURIs: [ 'https://client.example.org/cb' ]
          },
          scope: [ 'openid', 'profile', 'email' ]
        };
        
        svc.issue(msg, function(err, token) {
          if (err) { return done(err); }
          expect(directory.read).to.be.calledOnce;
          expect(directory.read.getCall(0).args[0]).to.equal('248289761001');
          expect(vault.get).to.be.calledOnce;
          expect(vault.get.getCall(0).args[0]).to.be.a('function');
          expect(jwt.sign).to.be.calledOnce;
          expect(jwt.sign.getCall(0).args[0]).to.deep.equal({
            iss: 'https://server.example.com',
            sub: '248289761001',
            aud: 's6BhdRkqt3',
            name: 'Jane Doe',
            email: 'janedoe@example.com',
            exp: 1311288170,
            iat: 1311280970
          });
          expect(jwt.sign.getCall(0).args[1]).to.equal('PRIVATE KEY');
          expect(token).to.equal('eyJhbGci');
          done();
        });
      }); // should issue token with email
      
    }); // #issue
    
  }); // IDTokenService
  
});
