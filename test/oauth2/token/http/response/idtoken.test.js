/* global describe, it */

var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../../../com/oauth2/token/http/response/idtoken');


describe('token/http/response/idtoken', function() {
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('http://i.authnomicon.org/oauth2/token/http/ResponseParameters');
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
        name: 'Example Client',
        redirectURIs: [ 'https://client.example.com/cb' ]
      }
    }
    
    var extend = factory(idts);
    extend(msg, function(err, params) {
      if (err) { return done(err); }
      
      expect(idts.issue).to.be.calledOnce;
      expect(idts.issue.getCall(0).args[0]).to.deep.equal({
        user: {
          id: '248289761001'
        },
        client: {
          id: 's6BhdRkqt3',
          name: 'Example Client',
          redirectURIs: [ 'https://client.example.com/cb' ]
        }
      });
      expect(params).to.deep.equal({ id_token: 'eyJhbGci' });
      done();
    });
    
    
  }); // should extend response with ID token
  
});
