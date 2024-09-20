import {React, useState, useEffect} from 'react'
import styles from './styles.module.css'
import {requestUserID} from "/src/api_to_server.js"


const PrivateChats = ({chatSelectHandler, chatSelected, leavedChat, chats, setChats, usernameNewMsg}) => {
    const [recipientName, setRecipientName] = useState('')
    const [serverResponse, setServerResponse] = useState(null)

    const handleNewPrivateChat = (event) => {
        event.preventDefault()
        console.info(chats)
        if(chats.every((chat)=>chat.username!=recipientName)){
            requestUserID(recipientName, setServerResponse)
        } else {
            alert("You already have a chat with this user!")
        }
        
        setRecipientName("")
    }

    useEffect(()=>{

        if (leavedChat) {
            console.info(leavedChat)
            setChats(chats.filter(chat => chat !== leavedChat))
            console.info(chats)
            console.info(leavedChat)
            localStorage.setItem("private_chats",JSON.stringify(chats))
   
        }
         }, [leavedChat])

    useEffect(() => {
        if (serverResponse){
            if (serverResponse.userID) {
                localStorage.setItem("private_chats",JSON.stringify([...chats, serverResponse]))
                setChats([...chats, serverResponse])
                chatSelectHandler(serverResponse, 0)
                setServerResponse(null)
            }
        }
    },[serverResponse])


    return (
        <>
        <div className={styles.chatlist}>
            
            {chats.map((chat)=>(
                <label className={chat.username == usernameNewMsg ? styles.usernameNewMsg : styles.username} >
                <input  type="radio" name='chat' className={styles.radiobtn}  onClick={(e) => {chatSelectHandler(chat, 0)}}/> 
                <span>{chat.username}</span> 
                </label>
            ))}
        </div>
        <form className={styles.startNewChat} onSubmit={handleNewPrivateChat}>
        <input 
            name = 'recipient'
            placeholder="Enter username"
            pattern='[a-zA-Z1-9_]*'
            value = {recipientName}
            onChange={(event) => setRecipientName(event.target.value)}
            required/>
            <button>Write to someone</button>
        </form>
        </>
    );
};

export default PrivateChats;