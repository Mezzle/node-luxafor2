/**
 * Runs a race between a setTimeout and a promise
 * Idea taken from https://italonascimento.github.io/applying-a-timeout-to-your-promises/
 */
class PromiseVsTimeout {

    /**
     * Start the race
     * @param {Number} timeout - milliseconds
     * @param {Promse} promise = a promise
     * @return {Promise}
     */
    static commit(timeout, promise) {
        let impatience = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject('Timed out after ' + timeout);
            }, timeout);
        });
        return Promise.race([impatience, promise]);
    }

}

module.exports = PromiseVsTimeout;
