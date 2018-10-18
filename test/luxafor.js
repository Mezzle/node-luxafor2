const assert = require('assert');
const {Luxafor, API} = require('..');

describe('Luxafor', function() {
    describe('#constructor', function() {
        it('should know the Luxafor PID', function() {
            let lux = new Luxafor();
            assert.strictEqual(lux.pid, API.PID);
        });
        it('should know the Luxafor VID', function() {
            let lux = new Luxafor();
            assert.strictEqual(lux.vid, API.VID);
        });
    });
    describe('#init', function() {
        it('should initialize a Luxafor light attached to this host', function() {
            let lux = new Luxafor();
            lux.init();
            assert.strictEqual(lux.readEndpoint.device.deviceDescriptor.idVendor, API.VID);
            assert.strictEqual(lux.readEndpoint.device.deviceDescriptor.idProduct, API.PID);
        });
    });
    describe('#getApiValue', function() {
        it('should be able to fetch API values', function() {
            assert.strictEqual(Luxafor.getApiValue('color', 'blue'), API.COLOR.BLUE);
            assert.strictEqual(Luxafor.getApiValue('WAVE_TYPE', 'unknown_5'), API.WAVE_TYPE.UNKNOWN_5);
            assert.strictEqual(Luxafor.getApiValue('byte', 'TIME'), API.BYTE.TIME);
            assert.strictEqual(Luxafor.getApiValue('wave_type', 5), API.WAVE_TYPE.UNKNOWN_5);
        });
        it('should return null if there is nothing to find', function() {
            assert.strictEqual(Luxafor.getApiValue('wave_type', 'disco'), null);
        });
    });
});
