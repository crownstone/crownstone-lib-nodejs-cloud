import {Locations} from "./locations";
import {Spheres} from "./spheres";
import {CloudRequestorInterface} from "../tools/requestors";
import {listCacheItemsInSphereInLocation} from "../tools/cache";


export class Crownstones {

  locations : Locations = null;
  spheres   : Spheres = null;
  rest : CloudRequestorInterface;
  filter : filter = null
  stoneIds = []

  constructor(cloudRequestor: CloudRequestorInterface, spheres: Spheres = null, locations: Locations = null, crownstoneIdentifier: filter = null) {
    this.rest = cloudRequestor;
    this.spheres = spheres;
    this.locations = locations;
    this.filter = crownstoneIdentifier;
  }

  async refresh() {
    await this.downloadAllCrownstones();
    return this;
  }

  async downloadAllCrownstones(): Promise<cloud_Stone[]> {
    let stones = await this.rest.getCrownstones()

    let filteredResult = [];
    let sphereIds   = this.spheres?.sphereIds     || [];
    let locationIds = this.locations?.locationIds || [];
    stones.forEach((stone) => {
      this.rest.cache.crownstones[stone.id] = stone;
      if (sphereIds.indexOf(stone.sphereId) !== -1 || sphereIds.length === 0) {
        if (locationIds.indexOf(stone.locationId) !== -1 || locationIds.length === 0) {
          filteredResult.push(stone);
        }
      }
    })
    return filteredResult;
  }

  async setSwitchState(value: number) { throw "setSwitchState NOT IMPLEMENTED YET" }
  async turnOn()                      { throw "turnOn NOT IMPLEMENTED YET" }
  async turnOff()                     { throw "turnOff NOT IMPLEMENTED YET" }


  _searchInCache() : boolean {
    let sphereIds = this.spheres?.sphereIds || [];
    let locationIds = this.locations?.locationIds || [];
    let stones = this.rest.cache.findCrownstones(this.filter);
    let found = false;
    if (stones.length > 0) {
      stones.forEach((stone) => {
        if (sphereIds.indexOf(stone.sphereId) !== -1 || sphereIds.length === 0) {
          if (locationIds.indexOf(stone.locationId) !== -1 || locationIds.length === 0) {
            this.stoneIds.push(stone.id);
            found = true;
          }
        }
      });
    }
    return found;
  }

  async resolveIdentifier() : Promise<void> {
    this.stoneIds = [];
    let result = this._searchInCache()
    if (result) { return; }

    if (typeof this.filter === 'string') {
      // possibly ID
      if (this.filter.length === 24) {
        try {
          let stone = await this.rest.getCrownstone(this.filter);
          this.rest.cache.crownstones[stone.id] = stone;
          this.stoneIds.push(stone.id);
          return;
        }
        catch (e) {
          // 401 means this id does not exist
          if (e?.request?.body?.error?.statusCode !== 401) {
            throw e;
          }
        }
      }
    }

    // if we do not have any sphere with this description, check if we have to download all of them.
    if (this.rest.cache.downloadedAll['crownstones'] === false) {
      await this.downloadAllCrownstones()

      let result = this._searchInCache()
      if (result) { return; }
    }

    throw { code: 404, type:"crownstones", message: "Could not find Crownstones(s) with this filter: " + this.filter}
  }

  async data() : Promise<cloud_Stone[]> {
    let sphereIds = this.spheres?.sphereIds || [];
    let sphereFilter = this.spheres?.filter || null;
    let locationIds = this.locations?.locationIds || [];
    let locationFilter = this.locations?.filter || null;


    if (sphereFilter !== null && sphereIds.length === 0) {
      // we need to identify the spheres
      await this.spheres.resolveIdentifier();
      return this.data();
    }
    else if (locationFilter !== null && locationIds.length === 0) {
      // we need to identify the locations
      await this.locations.resolveIdentifier();
      return this.data()
    }
    else if (this.filter !== null && this.stoneIds.length === 0) {
      // we need to identify the crownstones
      await this.resolveIdentifier();
      return await this.data();
    }
    else if (this.filter === null) {
      if (this.rest.cache.downloadedAll['crownstones']) {
        return this._getFilteredData()
      }
      // not cached, download now.
      await this.downloadAllCrownstones()

      return await this.data();
    }

    // if we are here, we have all required ids. We also have downloaded all required Crownstones.
    // all that is left to do is to filter the result from the cache.

    return this._getFilteredData()
  }

  _getFilteredData() : cloud_Stone[] {
    let sphereIds = this.spheres?.sphereIds || [];
    let locationIds = this.locations?.locationIds || [];

    return listCacheItemsInSphereInLocation(this.rest.cache.crownstones, sphereIds, locationIds, this.stoneIds);
  }
}