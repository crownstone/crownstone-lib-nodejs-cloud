import {RequestorBase} from "../../requestorBase";
import {req} from "../../../util/request";


export class SphereV2Requests extends RequestorBase {

  async getSphereEnergyUsage(sphereId: string, from: timeISOString, until: timeISOString, range: EnergyUsageRange) : Promise<EnergyReturnData[]> {
    const {body} = await req("GET",`${this.endpoint}sphere/${sphereId}/energyUsage?start=${from}&end=${until}&range=${range}`, this.addSecurity({responseType: 'json' }));
    return body as any;
  }

  async postSphereEnergyUsage(sphereId: string, energyUsage: EnergyMeasurementData[]) : Promise<StoreReply> {
    const {body} = await req("POST",`${this.endpoint}sphere/${sphereId}/energyUsage`, this.addSecurity({json: energyUsage, responseType: 'json' }));
    return body as any;
  }

  async getEnergyUploadPermission(sphereId: string) : Promise<boolean> {
    const {body} = await req("GET",`${this.endpoint}sphere/${sphereId}/energyUsageCollectionPermission`, this.addSecurity({responseType: 'text' }));
    return body === 'true' ? true : false;
  }

  async setEnergyUploadPermission(sphereId: string, permission: boolean) : Promise<boolean> {
    const {body} = await req("POST",`${this.endpoint}sphere/${sphereId}/energyUsageCollectionPermission?permission=${permission}`, this.addSecurity({responseType: 'text' }));
    return body === 'true' ? true : false;
  }

}


