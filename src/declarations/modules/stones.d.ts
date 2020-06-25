interface stones {
    /**
     * Create a crownstone in the cloud so the major and minor can be generated
     * @param data
     * @param background
     * @returns {*}
     */
    createStone: (data: any, background?: boolean) => Promise<any>;
    /**
     * Update a crownstone in the cloud
     * @param localStoneId
     * @param data
     * @param background
     * @returns {*}
     */
    updateStone: (cloudStoneId: string, data: any, background?: boolean) => Promise<any>;
    /**
     * Update a crownstone in the cloud
     * @param switchState
     * @param background
     * @returns {*}
     */
    updateStoneSwitchState: (switchState: any, background?: boolean) => Promise<any>;
    /**
     * Update a current energy usage
     * @param data
     * @param background
     * @returns {*}
     */
    updatePowerUsage: (data: any, background?: boolean) => Promise<any>;
    /**
     * Update a current energy usage
     * @param data
     * @param background
     * @returns {*}
     */
    updateBatchPowerUsage: (data: any[], background?: boolean) => Promise<any>;
    /**
     * !
     * !
     * ! ------------- DEPRECATED -----------------
     * !
     * !
     * Update the link from a crownstone to a room.
     * @param localLocationId
     * @param localSphereId
     * @param updatedAt
     * @param background
     * @param doNotSetUpdatedTimes
     * @returns {*}
     */
    updateStoneLocationLink: (cloudLocationId: string, localSphereId: string, updatedAt: any, background?: boolean, doNotSetUpdatedTimes?: boolean) => Promise<any[]>;
    /**
     * !
     * !
     * ! ------------- DEPRECATED -----------------
     * !
     * !
     * Delete the link from a crownstone to a room.
     * @param localLocationId
     * @param localSphereId
     * @param updatedAt
     * @param background
     * @returns {*}
     */
    deleteStoneLocationLink: (cloudLocationId: string, localSphereId: string, updatedAt: any, background?: boolean) => Promise<any[]>;
    /**
     * request the data of all crownstones in this sphere
     * @returns {*}
     */
    getStonesInSphere: (background?: boolean) => Promise<any>;
    /**
     * request the data from this crownstone in the cloud
     * @param localStoneId  database id of crownstone
     * @returns {*}
     */
    getStone: (cloudStoneId: string) => Promise<any>;
    /**
     * search for crownstone with this mac address
     * @param address  mac address
     * @returns {*}
     */
    findStone: (address: any) => Promise<any>;
    /**
     * Delete the data from this crownstone in the cloud in case of a failed setup or factory reset.
     * stoneId  database id of crownstone
     * @returns {*}
     */
    deleteStone: (cloudStoneId: string) => Promise<any>;
    sendStoneDiagnosticInfo: (data: any, background?: boolean) => Promise<any>;
}
