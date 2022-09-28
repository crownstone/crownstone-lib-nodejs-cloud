import {RequestorBase} from "../../requestorBase";
import {req} from "../../../util/request";


export class CrownstoneV2Requests extends RequestorBase {

  async deleteEnergyUsage(stoneId: string, from: timeISOString, until: timeISOString) : Promise<Count> {
    const {body} = await req(
      "DELETE",
      `${this.endpoint}stones/${stoneId}/energyUsage?start=${from}&end=${until}`,
      this.addSecurity( { responseType: 'json' })
    );
    return body as any;
  }
}

