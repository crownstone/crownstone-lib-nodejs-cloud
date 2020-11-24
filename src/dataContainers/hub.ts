import {CloudRequestorInterface} from "../tools/requestors";

export class Hub {

  rest: CloudRequestorInterface;

  constructor(cloudRequestor: CloudRequestorInterface) {
    this.rest = cloudRequestor;
  }

  async data() : Promise<cloud_Hub> {
    return this.rest.getHub()
  }

  async setLocalIpAddress(ipAddress) : Promise<void> {
    return this.rest.hubSetLocalIpAddress(ipAddress)
  }

  async uploadEnergyMeasurements(measurementData: EnergyMeasurementData) : Promise<void> {
    return this.rest.uploadEnergyMeasurementData(measurementData);
  }

}