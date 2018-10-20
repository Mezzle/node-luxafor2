const assert = require('assert');
const {Luxafor, API} = require('..');



describe('Luxafor', function() {

    var luxafor = new Luxafor();

    beforeEach(function() {
        luxafor.init();
    });

    describe('#init()', function() {
        it('should check that the attached device has the correct VID', function() {
            assert.strictEqual(luxafor.readEndpoint.device.deviceDescriptor.idVendor, API.VID);
        });
        it('should check that the attached device has the correct PID', function() {
            assert.strictEqual(luxafor.readEndpoint.device.deviceDescriptor.idProduct, API.PID);
        });
    });

    describe('#getApiValue()', function() {
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

    describe('#getDeviceInfo()', function() {
        it('should get firmware and serial numbers from the light', function(done) {
            luxafor.getDeviceInfo().then((deviceInfo) => {
                // since we don't know what the firmware version, etc will be
                // we're just going to make sure that the device is returning an object
                // that has the correct keys.
                let keysFromDeviceInfo = Object.keys(deviceInfo);
                let keysFromAnEmptyBuffer = Object.keys(API.DEVICE_INFO(new Buffer(8).fill(0)));
                assert.deepStrictEqual(keysFromDeviceInfo, keysFromAnEmptyBuffer);
                done();
            }).catch((err) => {
                done(err);
            });
        });
    });

});
