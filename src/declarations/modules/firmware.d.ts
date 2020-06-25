interface firmware {
    getFirmwareDetails: (version: any, hardwareVersion: any, background?: boolean) => Promise<any>;
    getLatestAvailableFirmware: (background?: boolean) => Promise<any>;
}
