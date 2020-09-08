import {CloudRequestorInterface} from "../tools/requestors";
import {Crownstones} from "./crownstones";
import {Spheres} from "./spheres";
import {listCacheItemsInSphere, listCacheItemsInSphereInLocation} from "../tools/cache";


export class Locations {

  locationIds : string[]  = [];
  spheres : Spheres = null;
  filter : filter = null
  rest : CloudRequestorInterface;

  constructor(cloudRequestor: CloudRequestorInterface, spheres: Spheres = null, locationFilter: filter = null) {
    this.rest = cloudRequestor;
    this.spheres = spheres;
    this.filter = locationFilter;
  }

  async refresh() {
    await this.downloadAllLocations();
    return this;
  }

  async data() : Promise<cloud_Location[]> {
    let sphereIds    = this.spheres?.sphereIds || [];
    let sphereFilter = this.spheres?.filter    || null;

    if (sphereFilter !== null && sphereIds.length === 0) {
      // we need to identify the spheres
      await this.spheres.resolveIdentifier();
      return this.data();
    }
    else if (this.filter !== null && this.locationIds.length === 0) {
      // we need to identify the locations
      await this.resolveIdentifier();
      return await this.data();
    }
    else if (this.filter === null) {
      // all locations!
      if (this.rest.cache.downloadedAll['locations']) {
        return this._getFilteredData()
      }
      // not cached, download now.
      await this.downloadAllLocations()
      return await this.data();
    }
    // if we are here, we have all the required ids. We also have downloaded all required locations.
    // All that is left to do is to serve the result from the cache
    return this._getFilteredData();
  }

  _getFilteredData() {
    let sphereIds = this.spheres?.sphereIds || [];

    let itemsInCache = listCacheItemsInSphere(this.rest.cache.locations, sphereIds, this.locationIds);
    this.locationIds = [];
    for (let i = 0; i < itemsInCache.length; i++) {
      this.locationIds.push(itemsInCache[i].id)
    }
    return itemsInCache;
  }


  _searchInCache() : boolean {
    let sphereIds = this.spheres?.sphereIds || [];
    let locations = this.rest.cache.findLocations(this.filter);
    let found = false;
    if (locations.length > 0) {
      locations.forEach((location) => {
        if (sphereIds.indexOf(location.sphereId) !== -1 || sphereIds.length === 0) {
          this.locationIds.push(location.id);
          found = true;
        }
      });
    }
    return found;
  }

  async resolveIdentifier() : Promise<void> {
    this.locationIds = [];
    let result = this._searchInCache()
    if (result) { return; }

    if (typeof this.filter === 'string') {
      // possibly ID
      if (this.filter.length === 24) {
        try {
          let location = await this.rest.getLocation(this.filter);
          this.rest.cache.locations[location.id] = location;
          this.locationIds.push(location.id);
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
    if (this.rest.cache.downloadedAll['locations'] === false) {
      await this.downloadAllLocations()

      let result = this._searchInCache()
      if (result) { return; }
    }

    throw { code: 404, type:"locations", message: "Could not find Locations(s) with this filter: " + this.filter}
  }

  async downloadAllLocations(): Promise<cloud_Location[]> {
    let locations = await this.rest.getLocations()

    let filteredResult = [];
    let sphereIds = this.spheres?.sphereIds || [];
    this.rest.cache.locations = {};
    locations.forEach((location) => {
      this.rest.cache.locations[location.id] = location;
      if (sphereIds.indexOf(location.sphereId) !== -1 || sphereIds.length === 0) {
        filteredResult.push(location);
      }
    })

    return filteredResult;
  }


  crownstones(filter: filter = null) : Crownstones {
    return new Crownstones(this.rest, this.spheres, this, filter);
  }


}