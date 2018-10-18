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
     * Initialize a single Luxafor light.  Thank you Dave Irvine.
     * @param {Number} cb - callback to execute
     */
    init(cb = undefined) {
        /*
          It's worth adding some notes in case someone else or a future version of myself would
          like to add multi-light support.

          To identify the device this class currently uses the method `usb.findByIds()` which short-
          circuits its search by returning the first match. You will want to take a look at
          `usb.getDeviceList()` instead.  You can use the property named `deviceDescriptor` and
          then identify each device by `idVendor == API.VID` and `idProduct == API.PID`.
        */
        let device = usb.findByIds(this.vid, this.pid);

        device.open();

        let iface = device.interface(0);

        if (iface.isKernelDriverActive()) {
            iface.detachKernelDriver();
        }

        iface.claim();

        this.writeEndpoint = iface.endpoint(API.ENDPOINT.WRITE);
        this.readEndpoint = iface.endpoint(API.ENDPOINT.READ);

        this.buffer = new Buffer([0, 0]);
        this.writeToDevice(cb);
    }

    /**
     * Reset the previous buffer and create a new one
     * @private
     * @param {Number} size - the length of the new buffer
     */
    resetWriteBuffer(size) {
        this.buffer = null;
        this.buffer = new Buffer(size);
    }

    /**
     * Flush the buffer by sending it into the light
     * @private
     * @param {Function} cb - callback to execute
     */
    writeToDevice(callback = undefined) {
        this.writeEndpoint.transfer(this.buffer, function() {
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
    readFromDevice(callback = undefined) {
        return new Promise((resolve, reject) => {
            this.readEndpoint.transfer(8, (err, data) => {
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
     * Set a single byte in the write buffer
     * @private
     * @param {Number} byte - The offset for the byte you want to set
     * @param {Number} data - The byte we are going to set
     * @return {Luxafor}
     */
    setWriteBufferByte(byte, data) {
        this.buffer.writeUInt8(data, byte);
        return this;
    }

    /**
     * Set one of several preset colors from the API
     * @param {Number} char - number representing one of the preset colors
     * @param {Function} cb - callback to execute
     */
    simpleColor(char, cb = undefined) {
        this.resetWriteBuffer(2);
        this.setWriteBufferByte(API.BYTE.COMMAND, API.COMMAND.SET_COLOR_SIMPLE);
        this.setWriteBufferByte(0x01, char);
        this.writeToDevice(cb);
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
        this.resetWriteBuffer(5);
        this.setWriteBufferByte(API.BYTE.COMMAND, API.COMMAND.SET_COLOR_NO_FADE);
        this.setWriteBufferByte(API.BYTE.LED, led);
        this.setWriteBufferByte(API.BYTE.RED, red);
        this.setWriteBufferByte(API.BYTE.GREEN, green);
        this.setWriteBufferByte(API.BYTE.BLUE, blue);
        this.writeToDevice(cb);
    }

    /**
     * Instantly set a color then set the color change timer
     * The time param causes the specified time delay to occur on all subsequent calls to color
     * @param {Number} led - `0..6` the light to control
     * @param {Number} red - `0..255` red value
     * @param {Number} green - `0..255` green value
     * @param {Number} blue - `0..255` blue value
     * @param {Number} time - `0..255` length of fade effect
     * @param {Function} cb - callback to execute
     */
    colorFade(led, red, green, blue, time, cb = undefined) {
        this.resetWriteBuffer(6);
        this.setWriteBufferByte(API.BYTE.COMMAND, API.COMMAND.SET_COLOR_FADE);
        this.setWriteBufferByte(API.BYTE.LED, led);
        this.setWriteBufferByte(API.BYTE.RED, red);
        this.setWriteBufferByte(API.BYTE.GREEN, green);
        this.setWriteBufferByte(API.BYTE.BLUE, blue);
        this.setWriteBufferByte(API.BYTE.TIME, time);
        this.writeToDevice(cb);
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
        this.resetWriteBuffer(8);
        this.setWriteBufferByte(API.BYTE.COMMAND, API.COMMAND.STROBE);
        this.setWriteBufferByte(API.BYTE.LED, led);
        this.setWriteBufferByte(API.BYTE.RED, red);
        this.setWriteBufferByte(API.BYTE.GREEN, green);
        this.setWriteBufferByte(API.BYTE.BLUE, blue);
        this.setWriteBufferByte(API.BYTE.TIME, time);
        this.setWriteBufferByte(API.BYTE.STROBE_PADDING, 0);
        this.setWriteBufferByte(API.BYTE.STROBE_REPEAT, repeat);
        this.writeToDevice(cb);
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
        this.resetWriteBuffer(8);
        this.setWriteBufferByte(API.BYTE.COMMAND, API.COMMAND.WAVE);
        this.setWriteBufferByte(API.BYTE.WAVE_TYPE, type);
        this.setWriteBufferByte(API.BYTE.RED, red);
        this.setWriteBufferByte(API.BYTE.GREEN, green);
        this.setWriteBufferByte(API.BYTE.BLUE, blue);
        this.setWriteBufferByte(API.BYTE.WAVE_PADDING, 0);
        this.setWriteBufferByte(API.BYTE.WAVE_REPEAT, repeat);
        this.setWriteBufferByte(API.BYTE.WAVE_SPEED, speed);
        this.writeToDevice(cb);
    }

    /**
     * Run the light through preprogrammed sequences
     * @param {Number} pattern - `0..8` the preset pattern to use
     * @param {Number} repeat - `0..255` number of iterations, 0 is infinite
     * @param {Function} cb - callback to execute
     */
    pattern(pattern, repeat, cb = undefined) {
        this.resetWriteBuffer(3);
        this.setWriteBufferByte(API.BYTE.COMMAND, API.COMMAND.PATTERN);
        this.setWriteBufferByte(API.BYTE.PATTERN_ID, pattern);
        this.setWriteBufferByte(API.BYTE.PATTERN_REPEAT, repeat);
        this.writeToDevice(cb);
    }

    /**
     * Get an API value by key from the API object
     * Case insensitive
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

    /*
     * Stubbing out some functions for future use
     */
    strobeAsync(led, red, green, blue, time, repeat, cb = undefined) { }
    waveAsync(type, red, green, blue, repeat, speed, cb = undefined) { }
    patternAsync(pattern, repeat, cb = undefined) { }

}

module.exports = Luxafor;
