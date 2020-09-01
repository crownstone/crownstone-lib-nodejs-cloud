import {Locations} from "./locations";
import {Spheres} from "./spheres";
import {CloudRequestorInterface} from "../tools/requestors";
import {listCacheItemsInSphereInLocation} from "../tools/cache";


export class Crownstones {

  locations : Locations = null;
  spheres   : Spheres = null;
  rest : CloudRequestorInterface;
  filter : filter = null;
  stoneIds = [];


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

    this.rest.cache.crownstones = {};
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

  id(id: string) {
    this.stoneIds = [id];
    return this;
  }


  /**
   * this method will ensure we know which ID's to use for this request.
   */
  async prepare() {
    if (this.stoneIds.length !== 0) { return; }
    // the data method gets all required data to figure out which crownstones to switch.
    await this.data();
  }

  async setMultiSwitch(switchData: SwitchData[]) {
    throw 'setMultiSwitch is not implemented yet';
  }


  async currentSwitchState() : Promise<number> {
    await this.prepare();

    if (this.stoneIds.length === 0) { return 0 }
    if (this.stoneIds.length > 1) {
      throw "For multiple Crownstones, use .currentSwitchStateData()";
    }

    let stoneId = this.stoneIds[0];
    let data = await this.rest.getCurrentSwitchState(stoneId);
    return data.switchState || 0;
  }

  async currentSwitchStateData() : Promise<{[stoneId: string]: cloud_SwitchState}> {
    let switchStateData = {};
    let data = await this.data();

    for (let i = 0; i < data.length; i++) {
      let stoneItem = data[i];

      switchStateData[stoneItem.id] = stoneItem.currentSwitchState;
    }
    return switchStateData;
  }

  async setSwitch(value: number) {
    await this.prepare()

    if (this.stoneIds.length === 0) { return; }

    // normalize value
    if (value > 1) { value /= 100; }
    value = Math.max(0,Math.min(1, value));

    if (this.stoneIds.length > 1) {
      let list : SwitchData[] = [];
      for (let i = 0; i < this.stoneIds.length; i++) {
        let stoneId = this.stoneIds[i];
        if (this.rest.cache.crownstones[stoneId] === undefined) {
          await this.refresh();
        }
        // this can happen if a stone is deleted.
        if (this.rest.cache.crownstones[stoneId] !== undefined) {
          let stone = this.rest.cache.crownstones[stoneId];
          list.push({sphereId: stone.sphereId, type:'SET_STATE', stoneId: stoneId, state: value*100})
        }
      }
      return await this.setMultiSwitch(list);
    }

    await this.rest.switchCrownstone(this.stoneIds[0], value)
  }

  async turnOn() {
    throw "turnOn NOT IMPLEMENTED YET"
  }
  async turnOff() {
    throw "turnOff NOT IMPLEMENTED YET"
  }


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
      await this.downloadAllCrownstones();
      return await this.data();
    }

    // if we are here, we have all required ids. We also have downloaded all required Crownstones.
    // all that is left to do is to filter the result from the cache.

    return this._getFilteredData()
  }

  _getFilteredData() : cloud_Stone[] {
    let sphereIds = this.spheres?.sphereIds || [];
    let locationIds = this.locations?.locationIds || [];

    let itemsInCache =  listCacheItemsInSphereInLocation(this.rest.cache.crownstones, sphereIds, locationIds, this.stoneIds);
    this.stoneIds = [];
    for (let i = 0; i < itemsInCache.length; i++) {
      this.stoneIds.push(itemsInCache[i].id)
    }
    return itemsInCache;
  }
}