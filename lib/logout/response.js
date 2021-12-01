var EventEmitter = require('events').EventEmitter;
var util = require('util');


function Response() {
  EventEmitter.call(this);
}

util.inherits(Response, EventEmitter);

Response.prototype.prompt = function(name, options) {
  this.emit('prompt', name, options);
  this.end();
}

Response.prototype.logout = function() {
  this.emit('logout', true);
  this.end();
}

Response.prototype.end = function() {
  this.emit('end');
}


module.exports = Response;
