interface messages {
    createMessage: (data: any, background: any) => Promise<any>;
    receivedMessage: (cloudMessageId: string, background: any) => Promise<any>;
    readMessage: (cloudMessageId: string, background: any) => Promise<any>;
    getMessage: (cloudMessageId: string, background?: boolean) => Promise<any>;
    getNewMessagesInSphere: (background?: boolean) => Promise<any>;
    getAllMessagesInSphere: (background?: boolean) => Promise<any>;
    getNewMessagesInLocation: (cloudLocationId: string, background?: boolean) => Promise<any>;
    getActiveMessages: (background?: boolean) => Promise<any>;
    addRecipient: (recipientId: string, background?: boolean) => Promise<any>;
    deleteMessage: (cloudMessageId: string, background?: boolean) => Promise<any>;
    deleteAllMessages: (background?: boolean) => Promise<any>;
}
