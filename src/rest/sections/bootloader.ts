import { cloudApiBase } from "./cloudApiBase";

export const bootloader : bootloader = {
  getBootloaderDetails: function (version, hardwareVersion, background = true) {
    return cloudApiBase._setupRequest('GET', '/Bootloaders?version=' + version + '&hardwareVersion=' + hardwareVersion, {background:background});
  },

  getLatestAvailableBootloader: function (background = true) {
    return cloudApiBase._setupRequest('GET', '/Bootloaders/latest', {background: background});
  },
};