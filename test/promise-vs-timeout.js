const assert = require('assert');
const PromiseVsTimeout = require('../lib/promise-vs-timeout');

describe('PromiseVsTimeout', function() {
    describe('#commit()', function() {
        it('should win a race', function(done) {
            PromiseVsTimeout.commit(50, new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, 20);
            })).then(() => {
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it('should gracefully lose a race', function(done) {
            PromiseVsTimeout.commit(20, new Promise((resolve, reject) => {
                setTimeout(() => { }, 30);
            })).then(() => {
                done(new Error('I was suppose to lose'));
            }).catch((err) => {
                done();
            });
        });
    });
});
