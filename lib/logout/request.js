var EventEmitter = require('events').EventEmitter;
var util = require('util');


function Request(client) {
  EventEmitter.call(this);
  this.client = client;
}

util.inherits(Request, EventEmitter);


module.exports = Request;
