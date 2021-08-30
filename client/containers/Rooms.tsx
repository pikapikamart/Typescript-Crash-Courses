import React, { useRef } from "react";
import { useSocket } from "../context/socket.context";
import EVENTS from "../config/events";
import styles from "../styles/Room.module.css";


const RoomContainer = () =>{
  const { socket, roomId, rooms } = useSocket();
  const newRoomRef = useRef(null);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => event.preventDefault();

  const handleCreateRoom = () =>{
    const roomName = newRoomRef.current.value || "";

    if ( !String(roomName).trim() ) return;

    socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });
    newRoomRef.current.value = "";
  }

  const handleJoinRoom = (key: string) =>{
    if ( key===roomId ) return;

    socket.emit(EVENTS.CLIENT.JOIN_ROOM, key);
  }

  return (
    <form action="#" onSubmit={handleFormSubmit} className={styles.wrapper}>
      <div className={styles.createRoomWrapper}>
        <input type="text" placeholder="room name" ref={newRoomRef}/>
        <button type="submit" onClick={handleCreateRoom} className="cta">CREATE ROOM</button>
      </div>
      <ul className={styles.roomList}>
        {Object.keys(rooms).map(key => (
          <li key={key}>
            <button
              disabled={key===roomId} 
              title={`Join ${rooms[key].name}`}
              onClick={() => handleJoinRoom(key)}>
              {rooms[key].name}
            </button>
          </li>
        ))}
      </ul>
      
    </form>
  )
}


export default RoomContainer;