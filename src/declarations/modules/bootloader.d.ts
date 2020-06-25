interface bootloader {
    getBootloaderDetails: (version: any, hardwareVersion: any, background?: boolean) => Promise<any>;
    getLatestAvailableBootloader: (background?: boolean) => Promise<any>;
}
