var usb = require('usb');
const API = require('./lib/constants');
class Luxafor {

    constructor() {
        this.pid = API.PID;
    	this.vid = API.VID;
    	this.endpoint = undefined;
        this.API = API;
    }

    init(cb) {
    	var device = undefined,
    	iface = undefined;

    	var device = usb.findByIds(this.vid, this.pid);
    	device.open();

    	iface = device.interface(0);

    	if (iface.isKernelDriverActive()) {
    		iface.detachKernelDriver();
    	}

    	iface.claim();

    	this.endpoint = iface.endpoint(1);

    	//Dummy data
    	var buff = new Buffer([0, 0]);
    	this.endpoint.transfer(buff, function () {
    		if (cb) {
    			cb();
    		}
    	});
    };

    strobeColor(r, g, b, cb) {
    	var buff = new Buffer(8);

    	//Strobe
    	buff.writeUInt8(3, 0);
    	//"Both Sides"
    	buff.writeUInt8(255, 1);

    	buff.writeUInt8(r, 2);
    	buff.writeUInt8(g, 3);
    	buff.writeUInt8(b, 4);

    	//"t" 10. Time?
    	buff.writeUInt8(10, 5);

    	//"d" ?
    	buff.writeUInt8(0, 6);

    	//"Re" 3. Repeat?
    	buff.writeUInt8(3, 7);

    	this.endpoint.transfer(buff, function () {
    		if (cb) {
    			cb();
    		}
    	});
    };

    setColor(r, g, b, cb = undefined) {
    	var buff = new Buffer(5);

    	//Jump
    	buff.writeUInt8(1, 0);
    	//"Both Sides"
    	buff.writeUInt8(255, 1);

    	buff.writeUInt8(r, 2);
    	buff.writeUInt8(g, 3);
    	buff.writeUInt8(b, 4);

    	this.endpoint.transfer(buff, function () {
    		if (cb) {
    			cb();
    		}
    	});
    };

    /**
     * @param Number type 0-5 the type of wave
     * @param Number red 0-255 red value
     * @param Number green 0-255 green value
     * @param Number blue 0-255 blue value
     * @param Number repeat 0-255, 0=forever, 1-255 # of iterations
     * @param Number speed 0-255 0 = fast, 255 = slow
     * @param Function a callback to execute
     */
    wave(type, r, g, b, repeat, speed, cb = undefined) {
        this.newBuffer(8);
        this.command(API.COMMAND.WAVE);
        this.buffer.writeUInt8(type, API.BYTE.WAVE_TYPE);
        this.rgb(r, g, b);
        this.buffer.writeUInt8(0, API.BYTE.WAVE_PADDING);
        this.buffer.writeUInt8(repeat, API.BYTE.WAVE_REPEAT);
        this.buffer.writeUInt8(speed, API.BYTE.WAVE_SPEED);
        this.flushBuffer(cb);
    }

    newBuffer(size) {
        this.buffer = null;
        this.buffer = new Buffer(size);
    }

    flushBuffer(callback = undefined) {
        this.endpoint.transfer(this.buffer, function() {
            if (callback) {
                callback();
            }
        });
    }

    command(command) {
        this.buffer.writeUInt8(command, API.BYTE.COMMAND);
    }

    rgb(red, green, blue) {
        this.buffer.writeUInt8(red, API.BYTE.RED);
        this.buffer.writeUInt8(green, API.BYTE.GREEN);
        this.buffer.writeUInt8(blue, API.BYTE.BLUE);
    }

}

module.exports = function () {
	return new Luxafor();
}
