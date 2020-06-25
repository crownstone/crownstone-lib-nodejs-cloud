interface preferences {
    getPreferences: (background?: boolean) => Promise<any>;
    createPreference: (data: any, background?: boolean) => Promise<any>;
    updatePreference: (preferenceCloudId: string, data: any, background?: boolean) => Promise<any>;
    deletePreference: (preferenceCloudId: string, background?: boolean) => Promise<any>;
}
