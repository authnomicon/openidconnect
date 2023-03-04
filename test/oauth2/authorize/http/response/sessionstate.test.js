/* global describe, it */

var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../../../com/oauth2/authorize/http/response/sessionstate');
var crypto = require('crypto');


describe('oauth2/authorize/http/response/sessionstate', function() {
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('module:oauth2orize.responseParametersFn');
  });
  
  it('should extend response with session state', function(done) {
    var txn = {
      client: {
        id: 's6BhdRkqt3',
        name: 'Example Client',
      },
      redirectURI: 'https://client.example.org/cb',
      req: {
        type: 'code',
        clientID: 's6BhdRkqt3',
        redirectURI: 'https://client.example.org/cb',
        scope: [ 'openid', 'profile', 'email' ],
        state: 'af0ifjsldkj'
      },
      user: {
        id: '248289761001',
        displayName: 'Jane Doe'
      },
      res: {
        allow: true,
        scope: [ 'openid', 'profile', 'email' ],
        authContext: {
          sessionState: 'mUemLTpt'
        }
      }
    }
    
    var extend = factory();
    extend(txn, function(err, params) {
      if (err) { return done(err); }
      
      var salt = params.session_state.split('.')[1];
      var expected = crypto
        .createHash('sha256')
        .update(['s6BhdRkqt3', 'https://client.example.org', 'mUemLTpt', salt].join(' '))
        .digest('hex') + '.' + salt;
      
      expect(params).to.deep.equal({ session_state: expected });
      done();
    });
  }); // should extend response with session state
  
  it('should not extend response when scope is not present', function(done) {
    var txn = {
      client: {
        id: 's6BhdRkqt3',
        name: 'Example Client',
      },
      redirectURI: 'https://client.example.org/cb',
      req: {
        type: 'code',
        clientID: 's6BhdRkqt3',
        redirectURI: 'https://client.example.org/cb',
        scope: [ 'openid', 'profile', 'email' ],
        state: 'af0ifjsldkj'
      },
      user: {
        id: '248289761001',
        displayName: 'Jane Doe'
      },
      res: {
        allow: true
      }
    }
    
    var extend = factory();
    extend(txn, function(err, params) {
      if (err) { return done(err); }
      
      expect(params).to.be.undefined;
      done();
    });
  }); // should not extend response when scope is not present
  
  it('should not extend response when openid scope value is not present', function(done) {
    var txn = {
      client: {
        id: 's6BhdRkqt3',
        name: 'Example Client',
      },
      redirectURI: 'https://client.example.org/cb',
      req: {
        type: 'code',
        clientID: 's6BhdRkqt3',
        redirectURI: 'https://client.example.org/cb',
        scope: [ 'openid', 'profile', 'email' ],
        state: 'af0ifjsldkj'
      },
      user: {
        id: '248289761001',
        displayName: 'Jane Doe'
      },
      res: {
        allow: true,
        scope: [ 'profile', 'email' ]
      }
    }
    
    var extend = factory();
    extend(txn, function(err, params) {
      if (err) { return done(err); }
      
      expect(params).to.be.undefined;
      done();
    });
  }); // should not extend response when openid scope value is not present
  
  it('should not extend response when authentication context is not available', function(done) {
    var txn = {
      client: {
        id: 's6BhdRkqt3',
        name: 'Example Client',
      },
      redirectURI: 'https://client.example.org/cb',
      req: {
        type: 'code',
        clientID: 's6BhdRkqt3',
        redirectURI: 'https://client.example.org/cb',
        scope: [ 'openid', 'profile', 'email' ],
        state: 'af0ifjsldkj'
      },
      user: {
        id: '248289761001',
        displayName: 'Jane Doe'
      },
      res: {
        allow: true,
        scope: [ 'openid', 'profile', 'email' ]
      }
    }
    
    var extend = factory();
    extend(txn, function(err, params) {
      if (err) { return done(err); }
      
      expect(params).to.be.undefined;
      done();
    });
  }); // should not extend response when authentication context is not available
  
  it('should not extend response when authentication context lacks session state', function(done) {
    var txn = {
      client: {
        id: 's6BhdRkqt3',
        name: 'Example Client',
      },
      redirectURI: 'https://client.example.org/cb',
      req: {
        type: 'code',
        clientID: 's6BhdRkqt3',
        redirectURI: 'https://client.example.org/cb',
        scope: [ 'openid', 'profile', 'email' ],
        state: 'af0ifjsldkj'
      },
      user: {
        id: '248289761001',
        displayName: 'Jane Doe'
      },
      res: {
        allow: true,
        scope: [ 'openid', 'profile', 'email' ],
        authContext: {
          sessionID: '08a5019c-17e1-4977-8f42-65a12843ea02'
        }
      }
    }
    
    var extend = factory();
    extend(txn, function(err, params) {
      if (err) { return done(err); }
      
      expect(params).to.be.undefined;
      done();
    });
  }); // should not extend response when authentication context lacks session state
  
});
