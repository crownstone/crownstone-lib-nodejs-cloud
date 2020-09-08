import {listCache, listCacheItems} from "../tools/cache";
import {CloudRequestorInterface} from "../tools/requestors";
import {Crownstones} from "./crownstones";
import {Locations} from "./locations";


export class Spheres {

  rest: CloudRequestorInterface;
  filter = null;
  sphereIds = [];

  constructor(cloudRequestor: CloudRequestorInterface, filter: filter = null, id = null) {
    this.rest = cloudRequestor;
    this.filter = filter;
    if (id) { this.sphereIds = [id]; }
  }


  async downloadAllSpheres(): Promise<cloud_Sphere[]> {
    let spheres = [];
    if (this.rest.isUser()) {
      spheres = await this.rest.getSpheres()
    } else if (this.rest.isHub()) {
      spheres = [await this.rest.getHubSphere()];
    }

    this.rest.cache.spheres = {};
    spheres.forEach((sphere) => {
      this.rest.cache.spheres[sphere.id] = sphere;
    })

    return spheres;
  }


  async resolveIdentifier() : Promise<void> {
    this.sphereIds = [];
    let spheres = this.rest.cache.findSpheres(this.filter);
    if (spheres.length > 0) {
      spheres.forEach((sphere) => { this.sphereIds.push(sphere.id) });
      return;
    }

    if (typeof this.filter === 'string') {
      // possibly ID
      if (this.filter.length === 24) {
        try {
          let sphere = await this.rest.getSphere(this.filter);
          this.rest.cache.spheres[sphere.id] = sphere;
          this.sphereIds.push(sphere.id);
          return;
        }
        catch (e) {
          if (e?.request?.body?.error?.statusCode !== 401) {
            throw e;
          }
        }
      }
    }

    // if we do not have any sphere with this description, check if we have to download all of them.
    if (this.rest.cache.downloadedAll['spheres'] === false) {
      await this.downloadAllSpheres()
      let spheres = this.rest.cache.findSpheres(this.filter);
      if (spheres.length > 0) {
        spheres.forEach((sphere) => { this.sphereIds.push(sphere.id) });
        return;
      }
    }

    throw { code: 404, type:"spheres", message: "Could not find Spheres(s) with this filter: " + this.filter};
  }

  crownstones(filter: filter = null) : Crownstones {
    return new Crownstones(this.rest, this, null, filter);
  }


  locations(filter: filter = null) : Locations {
    return new Locations(this.rest, this, filter);
  }

  async keys() : Promise<cloud_Keys[]> {
    let keys : cloud_Keys[] = [];
    if (this.rest.cache.keys !== null) {
      keys = this.rest.cache.keys;
    }
    else {
      keys = await this.rest.getKeys()
    }

    if (this.sphereIds.length === 0) {
      await this.data();
    }

    let requiredKeys = [];

    this.sphereIds.forEach((sphereId) => {
      for (let i = 0; i < keys.length; i++) {
        if (keys[i].sphereId === sphereId) {
          requiredKeys.push(keys[i]);
          return;
        }
      }
    })

    return requiredKeys;
  }

  async data() : Promise<cloud_Sphere[]> {
    // if we have a filter and resolved sphereIds, we should also have the spheres in cache.
    if (this.sphereIds.length > 0) {
      let items = listCacheItems(this.rest.cache.spheres, this.sphereIds);
      if (items.length === 0) {
        await this.downloadAllSpheres();
        items = listCacheItems(this.rest.cache.spheres, this.sphereIds);
      }
      return items;
    }
    // we do not have resolved the filter to sphere ids yet, do that first and retry
    else if (this.filter !== null && this.sphereIds.length === 0) {
      await this.resolveIdentifier();

      return this.data();
    }
    // there is no filter, just return the spheres.
    else if (this.filter === null) {
      if (this.rest.cache.downloadedAll['spheres']) {
        this.sphereIds = Object.keys(this.rest.cache.spheres);
        return listCache(this.rest.cache.spheres);
      }
      await this.downloadAllSpheres();
      return await this.data();
    }
    return [];
  }


  async refresh() {
    await this.downloadAllSpheres()
    return this;
  }


}