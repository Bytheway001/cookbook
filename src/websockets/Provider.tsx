import React, { useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { parseMessage, WebsocketMessages } from './messages';

type Props = {
    children?: React.ReactNode
}

const WSContext = React.createContext<any>(null!)
export const WebSocketProvider: React.FC<Props> = ({ children }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const socketUrl = useMemo(() => {
        return 'ws://192.168.0.11:400/cable'
    }, [])

    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

    const subscribe = useCallback(() => {
        sendMessage(JSON.stringify(WebsocketMessages.subscription))
    },[])
    // useEffect(()=>{
    //     let m = parseMessage(lastMessage)
    //     if(m && audioRef.current){
    //         audioRef.current.play();
    //     }
    // },[lastMessage])
   
    const playSound = ()=>{
        if(audioRef.current){
            audioRef.current.play();
        }
    }

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    const value={
        sendMessage,
        lastMessage,
        readyState,
        connectionStatus,
        subscribe,
        playSound
    }
    return (
        <WSContext.Provider value={value}>
            <audio ref={audioRef}>
                <source src="/bell.wav" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            {children}
        </WSContext.Provider>
    )
}

export const useWS = ()=>{
    const context = useContext(WSContext);
    return context;
}