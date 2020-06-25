interface installations {
    getInstallations: (options?: any) => Promise<any>;
    createInstallation: (appName: any, data: any, background?: boolean) => Promise<any>;
    updateInstallation: (installationId: string, data: any, background?: boolean) => Promise<any>;
    getInstallation: (installationId: string, background?: boolean) => Promise<any>;
    deleteInstallation: (installationId: string) => Promise<any>;
}
