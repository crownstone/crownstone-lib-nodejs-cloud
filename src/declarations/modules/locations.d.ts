interface locations {
    getLocations: (background?: boolean) => Promise<any>;
    createLocation: (data: any, background?: boolean) => Promise<any>;
    updateLocation: (cloudLocationId: string, data: any, background?: boolean) => Promise<any>;
    updateLocationPosition: (data: any, background?: boolean) => Promise<any>;
    deleteLocation: (cloudLocationId: string) => Promise<any>;
    deleteLocationPicture: () => Promise<any>;
}
