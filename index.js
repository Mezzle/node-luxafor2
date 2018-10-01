var usb = require('usb');
const LUX_PID = 0xf372;
const LUX_VID = 0x04d8;

class Luxafor {

    constructor() {
        this.pid = LUX_PID;
    	this.vid = LUX_VID;
    	this.endpoint = undefined;
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

    setColor(r, g, b, cb) {
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

    wave(type, r, g, b, repeat, speed) {
        var buff = new Buffer(8);
        buff.writeUInt8(4, 0);
        buff.writeUInt8(1, 1);
        buff.writeUInt8(255, 2);
        buff.writeUInt8(0, 3);
        buff.writeUInt8(0, 4);
        buff.writeUInt8(0, 5);
        buff.writeUInt8(10, 6);
        buff.writeUInt8(10, 7);
        this.endpoint.transfer(buff);
    }

}

module.exports = function () {
	return new Luxafor();
}
