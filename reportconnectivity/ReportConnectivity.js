'use strict';

var Client = require('azure-iot-device').Client;
var Protocol = require('azure-iot-device-mqtt').Mqtt;

//var connectionString = 'HostName=atigeo-iot-hub.azure-devices.net;DeviceId=atigeoNodeDevice2;SharedAccessKey=7wS3OUp2CWw+TT7/XJks/8vdNBsWVeXPIBsJGwtteJk=';
var connectionString = 'HostName=atigeo-iot-hub.azure-devices.net;DeviceId=atigeoNodeDevice;SharedAccessKey=uRJrLlH+DqtvdlNR+GJWxrw6bvjjyEK6baFKhbcLSU0=';
var client = Client.fromConnectionString(connectionString, Protocol);

client.open(function (err) {
    if (err) {
        console.error('could not open IotHub client');
    } else {
        console.log('client opened');

        client.getTwin(function (err, twin) {
            if (err) {
                console.error('could not get twin');
            } else {
                var patch = {
                    connectivity: {
                        type: 'cellular'
                    }
                };

                twin.properties.reported.update(patch, function (err) {
                    if (err) {
                        console.error('could not update twin');
                    } else {
                        console.log('twin state reported');
                        process.exit();
                    }
                });
            }
        });
    }
});


/*
iothub-explorer login "HostName=atigeo-iot-hub.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=Y70z8zMiCmZ/mL9SrQLyepDA/a9fV1KDJuxAgPrnLjE="

iothub-explorer create atigeoNodeDevice2 --connection-string
// connectionString:           HostName=atigeo-iot-hub.azure-devices.net;DeviceId=atigeoNodeDevice2;SharedAccessKey=7wS3OUp2CWw+TT7/XJks/8vdNBsWVeXPIBsJGwtteJk=

iothub-explorer get atigeoNodeDevice --connection-string
// connectionString:           HostName=atigeo-iot-hub.azure-devices.net;DeviceId=atigeoNodeDevice;SharedAccessKey=uRJrLlH+DqtvdlNR+GJWxrw6bvjjyEK6baFKhbcLSU0=

*/
