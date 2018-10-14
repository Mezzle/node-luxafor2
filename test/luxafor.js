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
    describe.skip('#init', function() { });
    describe('#getApiValue', function() {
        it('should be able to fetch API values', function() {
            assert.strictEqual(Luxafor.getApiValue('color', 'blue'), API.COLOR.BLUE);
        });
    });
});
