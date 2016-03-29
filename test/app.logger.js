/*************************************************************************
 * Copyright(c) 2012-2016 Jim Pravetz <jpravetz@epdoc.com>
 * May be freely distributed under the MIT license.
 **************************************************************************/

var epdocLogger = require('../index');
var should = require('should');

describe.only("Logger test", function () {

    var logMgr;
    var log;
    var token = '4d7f2890-1e74-4b61-9844-ffd8acc62911';

    it("Init LogManager and Logger", function (done) {
        logMgr = epdocLogger.logMgr();
        log = epdocLogger.get('moduleName');
        log.action('bake').info("Starting");
        log.data({c:4,e:7}).debug("Running",{a:2,b:3});
        done();
    });

    var buffer = [];
    function onMessage(params) {
        buffer.push(params);
    }

    it("Set Callback transport and verify previous messages", function (done) {
        logMgr.setTransport('callback',{callback:onMessage});
        var params = buffer.shift();
        should(params).have.property('time');
        should(params).have.properties({action:'bake',message:'Starting',module:'moduleName',level:'info'});
        params = buffer.shift();
        should(params).have.property('time');
        should(params).have.properties({message:'Running { a: 2, b: 3 }',module:'moduleName',level:'debug'});
        should.not.exist(params.action);
        should(params.data).have.properties({c:4,e:7});
        params = buffer.shift();
        should(params).have.property('time');
        should(params).have.properties({action:'logger.push',message:'Setting logger to Buffer',module:'logger',level:'info'});
        should(params.data).have.properties({transport:'Buffer'});
        params = buffer.shift();
        should(params).have.property('time');
        should(params).have.properties({action:'logger.push.success',message:'Set logger to Buffer',module:'logger',level:'info'});
        should(params.data).have.properties({transport:'Buffer'});
        params = buffer.shift();
        should.not.exist(params);
        done();
    });

    it("Verify new messages", function (done) {
        log = logMgr.get('module2');
        log.info("Doing more");
        params = buffer.shift();
        should(params).have.property('time');
        should(params).have.properties({message:'Doing more',module:'module2',level:'info'});
        should.not.exist(params.action);
        log.action('slide').warn("end");
        var params = buffer.shift();
        should(params).have.property('time');
        should(params).have.properties({action:'slide',message:'end',module:'module2',level:'warn'});
        params = buffer.shift();
        params = buffer.shift();
        should.not.exist(params);
        done();
    });



});
