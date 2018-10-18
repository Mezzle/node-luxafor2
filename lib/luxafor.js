var usb = require('usb');
const API = require('./constants');

/** Control a Luxafor light */
class Luxafor {

    /*
     * @constructor
     */
    constructor() {
        this.pid = API.PID;
        this.vid = API.VID;
        this.API = API;
    }

    /**
     * Initialize the Luxafor light.  Thank you Dave Irvine.
     * @param {Number} cb - callback to execute
     */
    init(cb = undefined) {
        let device = usb.findByIds(this.vid, this.pid);

        device.open();

        let iface = device.interface(0);

        if (iface.isKernelDriverActive()) {
            iface.detachKernelDriver();
        }

        iface.claim();

        this.endpoint = iface.endpoint(API.ENDPOINT.WRITE);
        this.inEndpoint = iface.endpoint(API.ENDPOINT.READ);

        this.buffer = new Buffer([0, 0]);
        this.flushBuffer(cb);
    }

    /**
     * Reset the previous buffer and create a new one
     * @private
     * @param {Number} size - the length of the new buffer
     */
    newBuffer(size) {
        this.buffer = null;
        this.buffer = new Buffer(size);
    }

    /**
     * Flush the buffer by sending it into the light
     * @private
     * @param {Function} cb - callback to execute
     */
    flushBuffer(callback = undefined) {
        this.endpoint.transfer(this.buffer, function() {
            if (callback) {
                callback();
            }
        });
    }

    /**
     * Read from the device
     * @private
     * @param {Function} cb - callback to execute
     * @return {Promise}
     */
    readBuffer(callback = undefined) {
        return new Promise((resolve, reject) => {
            this.inEndpoint.transfer(8, (err, data) => {
                if (err) {
                    reject(err);
                }
                if (callback) {
                    callback();
                }
                let buffer = Buffer.from(data);
                resolve(buffer);
            });
        });
    }

    /**
     * Set one of several preset colors from the API
     * @param {Number} char - number representing one of the preset colors
     * @param {Function} cb - callback to execute
     */
    simpleColor(char, cb = undefined) {
        this.newBuffer(2);
        this.buffer.writeUInt8(API.COMMAND.SET_COLOR_SIMPLE, API.BYTE.COMMAND);
        this.buffer.writeUInt8(char, 0x01);
        this.flushBuffer(cb);
    }

    /**
     * Set a color
     * @param {Number} led - `0..6` the light to control
     * @param {Number} red - `0..255` red value
     * @param {Number} green - `0..255` green value
     * @param {Number} blue - `0..255` blue value
     * @param {Function} cb - callback to execute
     */
    color(led, red, green, blue, cb = undefined) {
        this.newBuffer(5);
        this.buffer.writeUInt8(API.COMMAND.SET_COLOR_NO_FADE, API.BYTE.COMMAND);
        this.buffer.writeUInt8(led, API.BYTE.LED);
        this.buffer.writeUInt8(red, API.BYTE.RED);
        this.buffer.writeUInt8(green, API.BYTE.GREEN);
        this.buffer.writeUInt8(blue, API.BYTE.BLUE);
        this.flushBuffer(cb);
    }

    /**
     * Set a color and then fade
     * @param {Number} led - `0..6` the light to control
     * @param {Number} red - `0..255` red value
     * @param {Number} green - `0..255` green value
     * @param {Number} blue - `0..255` blue value
     * @param {Number} time - `0..255` length of fade effect
     * @param {Function} cb - callback to execute
     */
    colorFade(led, red, green, blue, time, cb = undefined) {
        this.newBuffer(6);
        this.buffer.writeUInt8(API.COMMAND.SET_COLOR_FADE, API.BYTE.COMMAND);
        this.buffer.writeUInt8(led, API.BYTE.LED);
        this.buffer.writeUInt8(red, API.BYTE.RED);
        this.buffer.writeUInt8(green, API.BYTE.GREEN);
        this.buffer.writeUInt8(blue, API.BYTE.BLUE);
        this.buffer.writeUInt8(time, API.BYTE.TIME);
        this.flushBuffer(cb);
    }

    /**
     * Make the light strobe
     * @param {Number} led - `0..6` the light to control
     * @param {Number} red - `0..255` red value
     * @param {Number} green - `0..255` green value
     * @param {Number} blue - `0..255` blue value
     * @param {Number} time - `0..255` length of strobe effect
     * @param {Number} repeat - `0..255` number of iterations, 0 is infinite
     * @param {Function} cb - callback to execute
     */
    strobe(led, red, green, blue, time, repeat, cb = undefined) {
        this.newBuffer(8);
        this.buffer.writeUInt8(API.COMMAND.STROBE, API.BYTE.COMMAND);
        this.buffer.writeUInt8(led, API.BYTE.LED);
        this.buffer.writeUInt8(red, API.BYTE.RED);
        this.buffer.writeUInt8(green, API.BYTE.GREEN);
        this.buffer.writeUInt8(blue, API.BYTE.BLUE);
        this.buffer.writeUInt8(time, API.BYTE.TIME);
        this.buffer.writeUInt8(0, API.BYTE.STROBE_PADDING);
        this.buffer.writeUInt8(repeat, API.BYTE.STROBE_REPEAT);
        this.flushBuffer(cb);
    }

    /**
     * Make the light display a wave pattern
     * @param {Number} type - `0..5` the type of wave
     * @param {Number} red - `0..255` red value
     * @param {Number} green - `0..255` green value
     * @param {Number} blue - `0..255` blue value
     * @param {Number} repeat - `0..255` number of iterations, 0 is infinite
     * @param {Number} speed - `0..255` 0 is faster
     * @param {Function} cb - callback to execute
     */
    wave(type, red, green, blue, repeat, speed, cb = undefined) {
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

    /**
     * Run the light through preprogrammed sequences
     * @param {Number} pattern - `0..8` the preset pattern to use
     * @param {Number} repeat - `0..255` number of iterations, 0 is infinite
     * @param {Function} cb - callback to execute
     */
    pattern(pattern, repeat, cb = undefined) {
        this.newBuffer(3);
        this.buffer.writeUInt8(API.COMMAND.PATTERN, API.BYTE.COMMAND);
        this.buffer.writeUInt8(pattern, API.BYTE.PATTERN_ID);
        this.buffer.writeUInt8(repeat, API.BYTE.PATTERN_REPEAT);
        this.flushBuffer(cb);
    }

    /**
     * Get an API value by key, case insensitive
     * @static
     * @param {String} haystack - the string name of haystack
     * @param {String} needle - the key to search
     * @param {Number|Null}
     */
    static getApiValue(haystack, needle) {
        let Haystack = haystack.toUpperCase();
        let Needle = String(needle).toUpperCase();
        if (Needle in API[Haystack]) {
            return API[Haystack][Needle];
        }
        return null;
    }

}

module.exports = Luxafor;
