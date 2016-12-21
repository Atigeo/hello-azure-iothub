'use strict';

var iothub = require('azure-iothub');
var connectionString = 'HostName=atigeo-iot-hub.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=Y70z8zMiCmZ/mL9SrQLyepDA/a9fV1KDJuxAgPrnLjE=';
var registry = iothub.Registry.fromConnectionString(connectionString);

var device = new iothub.Device(null);

device.deviceId = 'atigeoNodeDevice';
registry.create(device, function (err, deviceInfo, res) {
    if (err) {
        registry.get(device.deviceId, printDeviceInfo);
    }
    if (deviceInfo) {
        printDeviceInfo(err, deviceInfo, res)
    }
});

function printDeviceInfo(err, deviceInfo, res) {
    if (deviceInfo) {
        console.log('Device ID: ' + deviceInfo.deviceId);
        console.log('Device key: ' + deviceInfo.authentication.symmetricKey.primaryKey);
    }
}



