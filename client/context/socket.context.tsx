import io, { Socket } from "socket.io-client";
import { SOCKET_URL } from "../config/default";
import { createContext, useContext, useState, useEffect } from "react";
import EVENTS from "../config/events";


interface Message {
  username: string,
  message: string,
  time: string
}

interface Context {
  socket: Socket,
  username?: string,
  setUsername: Function,
  roomId?: string,
  rooms: object,
  messages?: Message[],
  setMessages: Function
}

const socket = io(SOCKET_URL); // use in context so that we could use the instance to "on" and "emit"

const SocketContext = createContext<Context>(
  {
    socket,
    setUsername: () => false,
    rooms: {},
    setMessages: () => false,
    messages: []
  }
);

export const useSocket = () => useContext(SocketContext); // returns an object


const SocketProvider = (props: any) =>{
  const [ username, setUsername ] = useState("");
  const [ roomId, setRoomId ] = useState("");
  const [ rooms, setRooms ] = useState({});
  const [ messages, setMessages ] = useState([]);

  useEffect(() =>{
    window.onfocus = () => {
      document.title = "Chat App";
    }
  }, [])

  useEffect(() =>{
    socket.on(EVENTS.SERVER.JOINED_ROOM, value =>{
      setRoomId(value);
      setMessages([]);
    })

    socket.on(EVENTS.SERVER.ROOMS, value =>{
      setRooms(value);
    })
  
  }, [])
  
  useEffect(() => {
    socket.on(EVENTS.SERVER.ROOM_MESSAGE, ({ message, username, time }: Message) => {
      if (!document.hasFocus()) {
        document.title = "New message...";
      }
      const payload = {
        message,
        username,
        time
      }
      setMessages(prev => ([...prev, payload]))
    });
  }, [socket]);

  const valueProvider = {
    socket,
    username, 
    setUsername,
    roomId,
    rooms,
    messages,
    setMessages
  };

  return (
    <SocketContext.Provider value={ valueProvider } {...props} />
  )
}

export default SocketProvider;
