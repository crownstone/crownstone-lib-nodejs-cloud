import {CloudRequestorInterface} from "../tools/requestors";

export class Hub {

  rest: CloudRequestorInterface;

  constructor(cloudRequestor: CloudRequestorInterface) {
    this.rest = cloudRequestor;
  }

  async data() : Promise<cloud_Hub> {
    return this.rest.getHub()
  }

  async setLocalIpAddress(ipAddress: string, httpPort?: number, httpsPort?: number) : Promise<void> {
    return this.rest.hubSetLocalIpAddress(ipAddress, httpPort, httpsPort)
  }

  async getUartKey() : Promise<string> {
    return this.rest.getUartKey();
  }

  async update(data: cloud_Hub_settable) : Promise<void> {
    return this.rest.updateHub(data);
  }

  async deleteHub() : Promise<Count> {
    return this.rest.deleteHub();
  }

}