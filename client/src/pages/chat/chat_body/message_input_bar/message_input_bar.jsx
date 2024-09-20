import {React, useState} from 'react'
import styles from './styles.module.css'
import { sendPrivateMessage } from '/src/api_to_server.js';

const MessageInput = ({setMessages, messages, chat}) => {
    const [msg, setMsg] = useState('')

    const handleSend = (event) => {
        event.preventDefault()
        if (msg.trim()){
            sendPrivateMessage(
                msg,
                chat.userID
            )
            if (!messages[chat.username]){
                setMessages({...messages, [chat.username]: [{sender:localStorage.getItem("username"), text:msg}]})
            
            } else {
            setMessages({...messages, [chat.username]: [...messages[chat.username], {sender:localStorage.getItem("username"), text:msg}]})
            }
            //localStorage.setItem(JSON.stringify())
        }
        setMsg('')
        
    }

    return (
        <div>
            <form className={styles.MessageInput} onSubmit={handleSend}>
                <input 
                    placeholder="Type a message..."
                    value={msg}
                    onChange={(event)=>setMsg(event.target.value)}       
                 />
                <button>Send</button>
            </form>
        </div>
    );
};

export default MessageInput;