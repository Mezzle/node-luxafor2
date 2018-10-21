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
        this.retries(4);
        it('should get firmware and serial numbers from the light', function(done) {
            luxafor.getDeviceInfo().then((buffer) => {
                assert.strictEqual(buffer.readUInt8(0,1), API.COMMAND.DEVICE_INFO);
                assert.notStrictEqual(buffer.readUInt8(1,1), 0);
                assert.notStrictEqual(buffer.readUInt8(2,1), 0);
                done();
            }).catch((err) => {
                done(err);
            });
        });
    });

    describe('#isDeviceInfoBuffer()', function() {
        let goodBuffer = Buffer.from([API.COMMAND.DEVICE_INFO, 0, 0, 0, 0, 0, 0, 0]);
        let badBuffer = API.REPLY.WAVE_5;
        it('should determine if a buffer is a DEVICE_INFO buffer', function() {
            assert.strictEqual(Luxafor.isDeviceInfoBuffer(goodBuffer), true);
            assert.strictEqual(Luxafor.isDeviceInfoBuffer(badBuffer), false);
        });
    });

});
