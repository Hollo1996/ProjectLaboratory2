
export interface MockWebSocketEventMap
{
    "login": () => void;
    "message": ( e: {data:string} ) => void;
}