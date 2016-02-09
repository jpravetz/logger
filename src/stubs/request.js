/*****************************************************************************
 * request.js
 * CONFIDENTIAL Copyright 2012-2016 Jim Pravetz. All Rights Reserved.
 *****************************************************************************/

var ModuleLogger = require('../log');

/**
 * Stub for express.request object, used when passing request object around when simulating req/res/next flow.
 * @param name Define the name to use for your own 'locals' (private variables).
 * @param options The object to attach to req[name], defaults to {}.
 * @return A request object
 */

var Request = function(options) {
    var startTime = (new Date()).getTime();
    if( options instanceof Object ) {
        for( var propName in options ) {
            this[propName] = options[propName];
        }
    }
    this.log = new ModuleLogger()
};

module.exports = Request;