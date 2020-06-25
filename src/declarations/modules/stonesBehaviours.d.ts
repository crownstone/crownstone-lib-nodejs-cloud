interface stonesBehaviours {
    createBehaviour: (data: any, background?: boolean) => Promise<any>;
    updateBehaviour: (cloudBehaviourId: string, data: any, background?: boolean) => Promise<any>;
    deleteBehaviour: (cloudBehaviourId: string, background?: boolean) => Promise<any>;
    deleteAllBehaviours: (background?: boolean) => Promise<any>;
    getBehaviours: (background?: boolean) => Promise<any>;
}
