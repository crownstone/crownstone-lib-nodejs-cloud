import { cloudApiBase } from "./cloudApiBase";


export const firmware : firmware = {
  getFirmwareDetails: function (version, hardwareVersion, background = true) {
    return cloudApiBase._setupRequest('GET', '/Firmwares?version=' + version + '&hardwareVersion=' + hardwareVersion, {background:background});
  },

  getLatestAvailableFirmware: function (background = true) {
    return cloudApiBase._setupRequest('GET', '/Firmwares/latest', {background: background});
  },
};