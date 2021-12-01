var EventEmitter = require('events').EventEmitter;
var util = require('util');


function Request() {
  EventEmitter.call(this);
}

util.inherits(Request, EventEmitter);


module.exports = Request;
