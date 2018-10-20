const {Luxafor, API} = require('.');

luxafor = new Luxafor();
luxafor.init();

luxafor.getDeviceInfo().then((info) => {
    console.log(info);
}).catch((err) => {
    console.log(err);
});
