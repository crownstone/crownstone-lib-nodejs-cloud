interface listeners_webhookModule {
    isListenerActive: (token) => any;
    deleteListenersByToken: (token) => any;
    deleteListener: (listenerId) => any;
    createListener: (listenerData: any) => any;
    getListeners: () => any;
}
