const assert = require('assert');
const {API} = require('..');

describe('API', function() {
    describe('#DEVICE_INFO()', function() {
        it('should be able to make keys from a buffer', function() {
            let deviceKeysFromEmptyBuffer = Object.keys(API.DEVICE_INFO(new Buffer(8).fill(0)));
            assert.deepStrictEqual(
                deviceKeysFromEmptyBuffer, 
                [ 'FW_VERSION', 'SERIAL_NUMBER_H', 'SERIAL_NUMBER_L' ]
            );
        });
    });
});
