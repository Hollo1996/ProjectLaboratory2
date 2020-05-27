
export type IncomingPacket =
{ type: "error", message: string } |
{ type: "login", query: string, token: string, inbox: InboxDto } |
{ type: "message", channelId: string, message: MessageDto } |
{ type: "conversationAdded", conversation: ConversationDto } |
{ type: "conversationRemoved", channelId: string } |
{ type: "user", user: UserDto };