import React from 'react'
import styles from './styles.module.css'

const MessageList = ({messages, chat}) => {

    return (
        
        <div className='Messagelist'>
           
                {messages[chat.username] && messages[chat.username].map((message)=>
                    (
                     <div className={message.sender==localStorage.getItem("username") ? styles.outcomingMsg : styles.incomingMsg}>
                        <div className={styles.sender}> {message.sender==localStorage.getItem("username") ? "You" : chat.username} </div>
                        <p className={styles.msg}>{message.text}</p>
                     </div>
                ))}
               
        </div>
    );
};

export default MessageList;