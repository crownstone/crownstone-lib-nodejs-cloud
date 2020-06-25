interface spheres {
    updateSphere: (cloudSphereId: string, data: any, background?: boolean) => any;
    inviteUser: (email: any, permission?: string) => any;
    getPendingSphereInvites: (background?: boolean) => any;
    resendInvite: (email: any, background?: boolean) => any;
    revokeInvite: (email: any, background?: boolean) => any;
    /**
     *
     * @returns {*}
     */
    getSpheres: (background?: boolean) => any;
    getUsers: (background?: boolean) => any;
    getAdmins: (background?: boolean) => any;
    getMembers: (background?: boolean) => any;
    getGuests: (background?: boolean) => any;
    getToons: (background?: boolean) => any;
    getPresentPeople: (ignoreDeviceId: string, background?: boolean) => any;
    /**
     * @param data
     * @param background
     */
    createSphere: (data: any, background?: boolean) => any;
    changeSphereName: (sphereName: any) => any;
    changeUserAccess: (email: any, accessLevel: any, background?: boolean) => any;
    updateFloatingLocationPosition: (data: any, background?: boolean) => any;
    deleteUserFromSphere: (userId: string) => any;
    deleteSphere: () => Promise<any>;
    _deleteSphere: (cloudSphereId: string) => any;
    leaveSphere: (cloudSphereId: string) => any;
    acceptInvitation: () => any;
    declineInvitation: () => any;
    getSphereAuthorizationTokens: (sphereId?: string) => any;
}
