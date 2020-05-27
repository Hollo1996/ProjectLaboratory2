
export type IncomingPacket =
{ type: "error", message: string } |
{ type: "login", query: string, token: string, inbox: InboxDto } |
{ type: "message", channelId: string, message: MessageDto } |
{ type: "user", user: UserDto };
//{ type: "conversationAdded", conversation: ConversationDto } |
//{ type: "conversationRemoved", channelId: string } |