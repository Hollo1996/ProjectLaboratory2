
export interface MockWebSocketEventMap
{
    "login": () => void;
    "message": ( e: string ) => void;
}