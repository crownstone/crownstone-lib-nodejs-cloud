import { cloudApiBase } from "./cloudApiBase";

export const devices : devices = {
  getDevices: function (background: true) {
    return cloudApiBase._setupRequest('GET', '/users/{id}/devices', {background:background, data:{filter:{"include":"installations"}}});
  },

  createDevice: function (data, background = true) {
    return cloudApiBase._setupRequest(
      'POST',
      '/users/{id}/devices',
      { data: data, background: background},
      'body'
    );
  },

  updateDevice: function (deviceId, data, background = true) {
    return cloudApiBase._setupRequest(
      'PUT',
      '/Devices/' + deviceId,
      { data: data, background: background },
      'body'
    );
  },

  sendTestNotification: function() {
    return cloudApiBase._setupRequest(
      'POST',
      '/Devices/{id}/testNotification/'
    );
  },

  deleteDevice: function(deviceId) {
    return cloudApiBase._setupRequest(
      'DELETE',
      '/users/{id}/devices/' + deviceId
    );
  },

  deleteAllDevices: function() {
    return cloudApiBase._setupRequest(
      'DELETE',
      '/users/{id}/deleteAllDevices'
    );
  },

  getTrackingNumberInSphere: function(cloudSphereId, background = true) {
    return cloudApiBase._setupRequest(
      'GET',
      '/Devices/{id}/trackingNumber/',
      { data: {sphereId:cloudSphereId}, background: background },
      'query'
    );
  },

  inSphere: function (cloudSphereId, background = true) {
    return cloudApiBase._setupRequest(
      'POST',
      '/Devices/{id}/inSphere/',
      { data: {sphereId:cloudSphereId}, background: background },
      'query'
    );
  },

  inLocation: function (cloudSphereId, cloudLocationId, background = true) {
    return cloudApiBase._setupRequest(
      'POST',
      '/Devices/{id}/inLocation/',
      { data: {sphereId:cloudSphereId, locationId:cloudLocationId }, background: background },
      'query'
    );
  },

  exitLocation: function (cloudSphereId, cloudLocationId, background = true) {
    return cloudApiBase._setupRequest(
      'POST',
      '/Devices/{id}/exitLocation/',
      { data: {sphereId:cloudSphereId, locationId:cloudLocationId }, background: background },
      'query'
    );
  },

  exitSphere: function (cloudSphereId, background = true) {
    return cloudApiBase._setupRequest(
      'POST',
      '/Devices/{id}/exitSphere/',
      { data: {sphereId:cloudSphereId}, background: background },
      'query'
    );
  },
};