import { type } from "os";

export const WebsocketMessages = {
    subscription: {
        "command": "subscribe",
        "identifier": "{\"channel\":\"WebNotificationsChannel\"}"
    },
    message: (text: string) => {
        return (
            {
                "command": "message",
                "identifier": "{\"channel\":\"WebNotificationsChannel\"}",
                "data": "{\"message\":{\"content\":\"" + text + "\"}}"
            }
        )

    }
}

export function parseMessage(webSocketResponse: any) {
    let o = typeof webSocketResponse === 'string' ? JSON.parse(webSocketResponse) : webSocketResponse;
    if(o && o.data){
        let parsed = JSON.parse(o.data);
        if(parsed.type !== 'ping' && parsed.message){
           
            return parsed.message;
        }
        


    }
    return null;
}