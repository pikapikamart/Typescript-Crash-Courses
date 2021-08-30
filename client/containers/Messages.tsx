import EVENTS from "../config/events";
import { useSocket } from "../context/socket.context";
import { useRef, useEffect, useState } from "react";
import styles from "../styles/Message.module.css";


const MessageContainer = () =>{
  const { socket, messages, roomId, username, setMessages } = useSocket();
  const newMessageRef = useRef(null);
  const messageContainerRef = useRef(null);


  useEffect(() =>{
   if ( messageContainerRef.current && messages ) {
    messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight - messageContainerRef.current.clientHeight;
   }
  }, [ messages ])

  const displayMessages = () =>{
    if ( messages!==null) {
      return messages.map(({ message, username, time }: any, index: number ) =>(
        <div key={index} className={styles.message}>
          <div className={styles.messageInner}>
            <span className={styles.messageSender}>{username} - {time}</span>
            <span className={styles.messageBody}>{message}</span>
          </div>
        </div>
      ))
    }
  }

  const handleSendMessage = () =>{
    const message = newMessageRef.current.value || "";
    
    if ( !String(message).trim() ) return;

    const date = new Date();
  
    const messageData = {
      username: "You",
      message,
      time: `${date.getHours()}: ${date.getMinutes()}`
    }

    socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, { roomId, message, username });

    if ( !messages.length ) {
      setMessages([messageData]);
    } else {
      setMessages((prev: []) => (
        [...prev,
        messageData]
      ))
    }

    newMessageRef.current.value = "";
    newMessageRef.current.focus();
  }


  if ( !roomId ) return <div></div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.messageList} ref={messageContainerRef}>
        {displayMessages()}
      </div>
      <div className={styles.messageBox}>
        <textarea 
          ref={newMessageRef} 
          name="displayMessage" 
          id="displayMessage" 
          cols={30} 
          rows={1} 
          placeholder="Tell us what you are thinking"
        />
        <button onClick={handleSendMessage}>SEND</button>
      </div>
    </div>
  )
}


export default MessageContainer;