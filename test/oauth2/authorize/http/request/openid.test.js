/* global describe, it */

var expect = require('chai').expect;
var $require = require('proxyquire');
var sinon = require('sinon');
var factory = require('../../../../../com/oauth2/authorize/http/request/openid');


describe('oauth2/authorize/http/request/openid', function() {
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('module:oauth2orize.RequestParametersProcessor');
  });
  
  it('should create processor', function() {
    var extensionsSpy = sinon.stub();
    var factory = $require('../../../../../com/oauth2/authorize/http/request/openid', {
      'oauth2orize-openid': { extensions: extensionsSpy }
    });
    
    var extensions = factory();
    expect(extensionsSpy).to.have.been.calledOnce;
  }); // should create processor
  
});