
export class CrownstoneWebhooks{

  adminKey : string
  apiKey   : string

  constructor(customEndpoint?:string) {
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  setAdminKey(adminKey: string) {
    this.adminKey = adminKey;
  }

}