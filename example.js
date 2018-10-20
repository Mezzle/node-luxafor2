const {Luxafor, API} = require('.');

luxafor = new Luxafor();
luxafor.init();

luxafor.getDeviceInfo().then((buffer) => {
    console.log(API.DEVICE_INFO(buffer));
}).catch((err) => {
    console.log(err);
});
