export type OutgoingPacket =
    { type: "login", email: string, password: string, staySignedIn: boolean } |
    { type: "loginWithToken", token: string } |
    { type: "register", email: string, password: string, displayName: string, staySignedIn: boolean } |
    { type: "contactRequest", email: string, firstMessage: string } |
    { type: "message", channelId: string, referenceTo: number, contentType: number, content: string };