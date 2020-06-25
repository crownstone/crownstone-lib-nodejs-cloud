interface devices {
    getDevices: (background: true) => Promise<any>;
    createDevice: (data: any, background?: boolean) => Promise<any>;
    updateDevice: (deviceId: string, data: any, background?: boolean) => Promise<any>;
    sendTestNotification: () => Promise<any>;
    deleteDevice: (deviceId: string) => Promise<any>;
    deleteAllDevices: () => Promise<any>;
    getTrackingNumberInSphere: (cloudSphereId: string, background?: boolean) => Promise<any>;
    inSphere: (cloudSphereId: string, background?: boolean) => Promise<any>;
    inLocation: (cloudSphereId: string, cloudLocationId: string, background?: boolean) => Promise<any>;
    exitLocation: (cloudSphereId: string, cloudLocationId: string, background?: boolean) => Promise<any>;
    exitSphere: (cloudSphereId: string, background?: boolean) => Promise<any>;
}
