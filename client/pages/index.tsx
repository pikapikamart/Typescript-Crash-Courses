import Head from 'next/head' // for the head element in html
import styles from "../styles/Home.module.css";
import { useState, useEffect, useRef } from 'react'
import { useSocket } from '../context/socket.context'
import RoomContainer from '../containers/Rooms'
import MessageContainer from '../containers/Messages'

const Home = () =>{
  const { username, setUsername } = useSocket();
  const [ hasCreated, setHasCreated ] = useState(false);
  const usernameRef = useRef(null);

  useEffect(() =>{
    if ( hasCreated ) {
      const userValue = usernameRef.current.value;
      localStorage.setItem("username", userValue);
      setHasCreated(false);
      setUsername(userValue);
      usernameRef.current.value = "";
    }
  }, [ hasCreated ])

  useEffect(() =>{
    if ( usernameRef ) {
      usernameRef.current.value = localStorage.getItem("username") || "";
    }
  }, [])

  const handleSetUsername = () =>{
    const value = usernameRef.current.value;
    
    if ( !value ) return;
    
    setHasCreated(true);
  }

  return (
    <>
      { !username && (
        <div className={styles.usernameWrapper}>
          <div className={styles.usernameInner }>
            <input type="text" placeholder="username" ref={usernameRef} />
            <button className="cta" aria-label="submit username" onClick={handleSetUsername}>START</button>
          </div>
        </div>
      )}
      { username && (
        <div className={styles.container}>
          <RoomContainer />
          <MessageContainer />
        </div>
      )}
    </>
  )
} 


export default Home;
