var exec = require('cordova/exec');

exports.coolMethod = function (arg0, success, error) {
    exec(success, error, 'readWriteUSBStorage', 'coolMethod', [arg0]);
};

exports.getDevices = function(options, callback) {
  cordova.exec(
      function(devices) {  // successCallback
        callback(devices);
      },
      function(msg) {  // errorCallback
        callback(msg);
//        callbackWithError('Get devices failed: ' + msg, callback);
      },
      'readWriteUSBStorage',
      'getDevices',
      [options]
      );
};


exports.openDevice = function(device, callback) {
  cordova.exec(
      function(handle) {  // successCallback
        callback(handle);
      },
      function(msg) {  // errorCallback
//        callbackWithError('Open device failed: ' + msg, callback);
      },
      'readWriteUSBStorage',
      'openDevice',
      [device]
      );
};

exports.closeDevice = function(handle, opt_callback) {
  var callback = opt_callback || function() {};
  cordova.exec(
      callback,  // successCallback
      function(msg) {  // errorCallback
//        callbackWithError('Close failed: ' + msg, callback);
      },
      'readWriteUSBStorage',
      'closeDevice',
      [{handle:handle.handle}]
      );
};

exports.listInterfaces = function(handle, callback) {
  cordova.exec(
      function(interfaceDescriptors) {
        interfaceDescriptors.forEach(function (interfaceDescriptor) {
//            interfaceDescriptor.extra_data = base64.toArrayBuffer(interfaceDescriptor.extra_data);
        });
        callback(interfaceDescriptors);
      },  // successCallback
      function(msg) {  // errorCallback
//        callbackWithError('List interfaces failed: ' + msg, callback, []);
      },
      'readWriteUSBStorage',
      'listInterfaces',
      [{handle:handle.handle}]
      );
};

exports.claimInterface = function(handle, interfaceNumber, callback) {
  if (typeof interfaceNumber != "number") {
    // List interfaces returns an object, the caller must extract the number
    // from it.
    return JSON.stringify(interfaceNumber);
  }
  cordova.exec(
      callback, // successCallback
      function(msg) {  // errorCallback
//        callbackWithError('Claim failed: ' + msg, callback);
      },
      'readWriteUSBStorage',
      'claimInterface',
      [{ handle: handle.handle,
         interfaceNumber: interfaceNumber}]
      );
};


exports.releaseInterface = function(handle, interfaceNumber, callback) {
  cordova.exec(
      callback,  // successCallback
      function(msg) {  // errorCallback
//        callbackWithError('Release interface failed: ' + msg, callback);
      },
      'readWriteUSBStorage',
      'releaseInterface',
      [{handle:handle.handle,
        interfaceNumber:interfaceNumber}]
      );
};


exports.controlTransfer = function(handle, transferInfo, callback) {
  var params = {};
  var ALLOWED_PROPERTIES = [
      'direction', 'recipient', 'requestType', 'request', 'value',
      'index', 'length', 'timeout',
      // Skip 'data' -- sent as positional param 1
  ];

  for (var i = 0; i < ALLOWED_PROPERTIES.length; ++i) {
    var name = ALLOWED_PROPERTIES[i];
    params[name] = transferInfo[name];
  }
  params.handle = handle.handle;
  cordova.exec(
      function(data) {  // successCallback
        callback({resultCode: 0, data:data});
      },
      function(msg) {  // errorCallback
//        callbackWithError('Control transfer failed: ' + msg, callback, {resultCode: 1});
      },
      'readWriteUSBStorage',
      'controlTransfer',
      [params, transferInfo['data']]
      );

};


exports.bulkTransfer = function(handle, transferInfo, callback) {
  if (typeof transferInfo.endpoint != "number") {
    // List interfaces returns endpoints an object, the caller must extract the
    // number from it.
    return JSON.stringify(transferInfo.endpoint);
  }

  var params = {
    handle: handle.handle,
    direction: transferInfo.direction,
    endpoint: transferInfo.endpoint,
    length: transferInfo.length,
    timeout: transferInfo.timeout
  };

  cordova.exec(
      function(data) {  // successCallback
        callback({resultCode: 0, data:data});
      },
      function(msg) {  // errorCallback
//        callbackWithError('Bulk transfer failed: ' + msg, callback, {resultCode: 1});
      },
      'readWriteUSBStorage',
      'bulkTransfer',
      [params, transferInfo['data']]
      );
};


exports.interruptTransfer = function(handle, transferInfo, callback) {
  if (typeof transferInfo.endpoint != "number") {
    // List interfaces returns endpoints an object, the caller must extract the
    // number from it.
    return JSON.stringify(transferInfo.endpoint);
  }

  var params = {
    handle: handle.handle,
    direction: transferInfo.direction,
    endpoint: transferInfo.endpoint,
    length: transferInfo.length,
    timeout: transferInfo.timeout
  };

  cordova.exec(
      function(data) {  // successCallback
        callback({resultCode: 0, data:data});
      },
      function(msg) {  // errorCallback
//        callbackWithError('Interrupt transfer failed: ' + msg, callback, {resultCode: 1});
      },
      'readWriteUSBStorage',
      'interruptTransfer',
      [params, transferInfo['data']]
      );
};


exports.requestAccess = function(device, interfaceId, callback) {
  // Deprecated. Always returns true.
  setTimeout(function() {
    callback(true);
  }, 0);
};


exports.cordova = {
  hasUsbHostFeature: function(callback) {
    exec(function(result) {
        callback(result);
      },
      function(error) {
        callback(false);
      },
      'readWriteUSBStorage',
      'hasUsbHostFeature',
      [{}]);
  }
};
