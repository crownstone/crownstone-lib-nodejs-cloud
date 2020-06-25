interface user {
    /**
     *
     * @param options
     * @returns {Promise}
     */
    registerUser: (options: any) => Promise<any>;
    /**
     *
     * @param options
     * {
     *   email: string,
     *   password: string,
     *   onUnverified: callback,
     *   onInvalidCredentials: callback,
     *   background: boolean
     * }
     *
     * resolves with the parsed data, rejects with {status: httpStatus, data: data}
     */
    login: (options: any) => Promise<any>;
    /**
     *
     * @param file {String} --> full path string.
     */
    setEarlyAccess: (level: any) => Promise<any>;
    removeProfileImage: (options?: any) => Promise<any>;
    /**
     *
     * @returns {*}
     */
    getUserData: (background?: boolean) => Promise<any>;
    /**
     *
     * @returns {*}
     */
    getPendingInvites: (background?: boolean) => Promise<any>;
    /**
     *
     * @param data
     * @param background
     * @returns {Promise}
     */
    updateUserData: (data: any, background?: boolean) => Promise<any>;
    /**
     *
     * @param options
     */
    requestVerificationEmail: (options?: any) => Promise<any>;
    /**
     *
     * @param options
     */
    requestPasswordResetEmail: (options?: any) => Promise<any>;
    getKeys: (cloudSphereId?: any, cloudStoneId?: any, background?: boolean) => Promise<any>;
}
