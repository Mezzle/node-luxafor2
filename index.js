var usb = require('usb');
const API = require('./lib/constants');
class Luxafor {

    constructor() {
        this.pid = API.PID;
    	this.vid = API.VID;
    	this.endpoint = undefined;
        this.API = API;
    }

    init(cb = undefined) {
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

        this.buffer = new Buffer([0, 0]);
    	this.flushBuffer(cb);
    };

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

    simpleColor(char, cb = undefined) {
        this.newBuffer(2);
        this.buffer.writeUInt8(API.COMMAND.SET_COLOR_SIMPLE, API.BYTE.COMMAND);
        this.buffer.writeUInt8(char, 0x01);
        this.flushBuffer(cb);
    }

    color(led, red, green, blue, cb = undefined) {
        this.newBuffer(5);
    	this.buffer.writeUInt8(API.COMMAND.SET_COLOR_NO_FADE, API.BYTE.COMMAND);
    	this.buffer.writeUInt8(led, API.BYTE.LED);
        this.buffer.writeUInt8(red, API.BYTE.RED);
        this.buffer.writeUInt8(green, API.BYTE.GREEN);
        this.buffer.writeUInt8(blue, API.BYTE.BLUE);
        this.flushBuffer(cb);
    };

    colorFade(led, red, green, blue, time, cb = undefined) {
        this.newBuffer(6);
    	this.buffer.writeUInt8(API.COMMAND.SET_COLOR_FADE, API.BYTE.COMMAND);
    	this.buffer.writeUInt8(led, API.BYTE.LED);
        this.buffer.writeUInt8(red, API.BYTE.RED);
        this.buffer.writeUInt8(green, API.BYTE.GREEN);
        this.buffer.writeUInt8(blue, API.BYTE.BLUE);
        this.buffer.writeUInt8(time, API.BYTE.TIME);
        this.flushBuffer(cb);
    };

    strobe(red, green, blue, cb = undefined) {
        this.newBuffer(8);
    	this.buffer.writeUInt8(API.COMMAND.STROBE, API.BYTE.COMMAND);
    	this.buffer.writeUInt8(API.LED.ALL, API.BYTE.LED);
        this.buffer.writeUInt8(red, API.BYTE.RED);
        this.buffer.writeUInt8(green, API.BYTE.GREEN);
        this.buffer.writeUInt8(blue, API.BYTE.BLUE);
    	this.buffer.writeUInt8(10, API.BYTE.TIME);
    	this.buffer.writeUInt8(0, API.BYTE.STROBE_PADDING);
    	this.buffer.writeUInt8(3, API.BYTE.STROBE_REPEAT);
        this.flushBuffer(cb);
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
        this.buffer.writeUInt8(API.COMMAND.WAVE, API.BYTE.COMMAND);
        this.buffer.writeUInt8(type, API.BYTE.WAVE_TYPE);
        this.buffer.writeUInt8(red, API.BYTE.RED);
        this.buffer.writeUInt8(green, API.BYTE.GREEN);
        this.buffer.writeUInt8(blue, API.BYTE.BLUE);
        this.buffer.writeUInt8(0, API.BYTE.WAVE_PADDING);
        this.buffer.writeUInt8(repeat, API.BYTE.WAVE_REPEAT);
        this.buffer.writeUInt8(speed, API.BYTE.WAVE_SPEED);
        this.flushBuffer(cb);
    }

    pattern(pattern, repeat) {
        this.newBuffer(3);
        this.buffer.writeUInt8(API.COMMAND.PATTERN, API.BYTE.COMMAND);
        this.buffer.writeUInt8(pattern, API.BYTE.PATTERN_ID);
        this.buffer.writeUInt8(repeat, API.BYTE.PATTERN_REPEAT);
        this.flushBuffer();
    }

}

module.exports = function () {
	return new Luxafor();
}
