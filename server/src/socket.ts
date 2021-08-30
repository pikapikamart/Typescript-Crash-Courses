import { Server, Socket } from "socket.io";
import logger from "./utils/logger";
import { nanoid } from "nanoid";


const EVENTS = {
  connection: "connection",
  CLIENT: {
    CREATE_ROOM: "CREATE_ROOM",
    SEND_ROOM_MESSAGE: "SEND_ROOM_MESSAGE",
    JOIN_ROOM: "JOIN_ROOM"
  },
  SERVER: {
    ROOMS: "ROOMS",
    JOINED_ROOM: "JOINED_ROOM",
    ROOM_MESSAGE: "ROOM_MESSAGE"
  }
}

interface RoomNames {
  name: string
}

interface Message {
  roomId: string,
  message: string,
  username: string
}

const rooms: Record<string, RoomNames> = {};

const socket = ({ io }: { io: Server }) =>{
  logger.info("Sockets enabled");

  io.on(EVENTS.connection, (socket: Socket) =>{
    logger.info("User connected: " + socket.id);

    socket.emit(EVENTS.SERVER.ROOMS, rooms);

    socket.on(EVENTS.CLIENT.CREATE_ROOM, ({ roomName }) =>{
      // Create a room Id
      const roomId = nanoid();
      
      // add the new room to the rooms object
      Object.assign(rooms, { [roomId]: { name: roomName } });
      
      // Join users
      socket.join(roomId);
      
      // Broadcast an event sayin there is a new room to all users, except for the room creator
      socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);
      
      // Emit back to the room creator
      socket.emit(EVENTS.SERVER.ROOMS, rooms);

      // Emit back to the room creator that they joined the room
      socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
    })

    socket.on(EVENTS.CLIENT.SEND_ROOM_MESSAGE, ({ roomId, message, username}: Message) =>{
      const date = new Date();

      socket.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, {
        message,
        username,
        time: `${date.getHours()}: ${date.getMinutes()}`
      });
    })

    socket.on(EVENTS.CLIENT.JOIN_ROOM, (roomId: string) =>{
      socket.join(roomId);
      
      socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
    })
    
  })
}


export default socket;