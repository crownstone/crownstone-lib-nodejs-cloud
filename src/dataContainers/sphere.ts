import {CloudRequestorInterface} from "../tools/requestors";

export class Sphere {

  rest: CloudRequestorInterface;
  restV2: CloudRequestorInterface;
  sphereId = null;

  constructor(cloudRequestor: CloudRequestorInterface, cloudRequestorV2: CloudRequestorInterface, id = null) {
    this.rest     = cloudRequestor;
    this.restV2   = cloudRequestorV2;
    this.sphereId = id;
  }

  async users() : Promise<cloud_sphereUserDataSet>{
    return await this.rest.getUsers(this.sphereId);
  }

  async authorizationTokens() : Promise<cloud_SphereAuthorizationTokens> {
    return await this.rest.getSphereAuthorizationTokens(this.sphereId);
  }

  async crownstones() : Promise<cloud_Stone[]> {
    return await this.rest.getCrownstonesInSphere(this.sphereId);
  }

  async locations() : Promise<cloud_Location[]> {
    return await this.rest.getLocationsInSphere(this.sphereId);
  }

  async keys() : Promise<cloud_Keys | null> {
    let keys = await this.rest.getKeys()

    for (let i = 0; i < keys.length; i++) {
      if (keys[i].sphereId === this.sphereId) {
        return keys[i];
      }
    }

    return null
  }

  async data() : Promise<cloud_Sphere> {
    return this.rest.getSphere(this.sphereId)
  }

  async presentPeople(ignoreDeviceId? : string) : Promise<SpherePresentPeople[]> {
    return this.rest.getPresentPeople(this.sphereId, ignoreDeviceId)
  }

  async setEnergyCollectionPermission(allowed: boolean) : Promise<boolean> {
    return this.restV2.setEnergyUploadPermission(this.sphereId, allowed);
  }

  async getEnergyCollectionPermission() : Promise<boolean> {
    return this.restV2.getEnergyUploadPermission(this.sphereId);
  }

  async uploadEnergyData(energyMeasurementData: EnergyMeasurementData[]) : Promise<StoreReply> {
    return this.restV2.postSphereEnergyUsage(this.sphereId, energyMeasurementData);
  }

  async getEnergyData(date: Date | number | string, range: 'day' | 'week' | 'month' | 'year') : Promise<EnergyReturnData[]> {
    date = new Date(date);

    let dates = getRange(date, range);

    return this.restV2.getSphereEnergyUsage(
      this.sphereId,
      dates.start.toISOString(),
      dates.end.toISOString(),
      range
    );
  }
}



function getRange(date, range) : {start: Date, end: Date } {
  if (range === "day") {
    let start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    let end   = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    return {start, end};
  }


  if (range === 'week') {
    // get the monday of the week of the date as start and a week later as end
    let start = new Date(date.getFullYear(), date.getMonth(), date.getDate() - (date.getDay()+6)%7);
    let end   = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 7);
    return {start, end};
  }


  if (range === 'month') {
    let start = new Date(date.getFullYear(), date.getMonth(), 1);
    let end   = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    return {start, end};
  }


  if (range === 'year') {
    let start = new Date(date.getFullYear(), 0, 1);
    let end   = new Date(date.getFullYear() + 1, 0, 1);
    return {start, end};
  }
}