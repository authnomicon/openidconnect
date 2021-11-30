/* global describe, it, expect */

var expect = require('chai').expect;
var factory = require('../../../com/logout/http/service');


describe('logout/http/service', function() {
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.deep.equal('http://i.bixbyjs.org/http/Service');
    expect(factory['@path']).to.equal('/openidconnect/logout');
    expect(factory['@singleton']).to.be.undefined;
  });
  
  it('should create service', function() {
    function logoutHandler() {};
  
    var service = factory(logoutHandler);
    
    expect(service).to.be.a('function');
    expect(service.length).to.equal(3);
  });
  
});
