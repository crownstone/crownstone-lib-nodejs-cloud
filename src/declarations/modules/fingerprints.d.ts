interface fingerprints {
    createFingerprint: (cloudLocationId: string, data: any, background: true) => Promise<any>;
    getFingerprintsInLocations: (cloudLocationIdArray: any, background?: boolean) => Promise<any>;
    getFingerprints: (fingerprintIdArray: any, background?: boolean) => Promise<any>;
    updateFingerprint: (fingerprintId: string, data: any, background?: boolean) => Promise<any>;
    getMatchingFingerprintsInLocations: (cloudLocationIdArray: any, background?: boolean) => Promise<any>;
    linkFingerprints: (fingerprintIdArray: any, background?: boolean) => Promise<any>;
    getFingerprintUpdateTimes: (fingerprintIdArray: any, background?: boolean) => Promise<any>;
}
