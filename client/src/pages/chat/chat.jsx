import {React, useState, useEffect} from 'react'
import RoomsBar from './rooms_bar/rooms_bar';
import CurChat from './chat_body/body';
import {waitOnPrivateMessage} from '/src/api_to_server.js';
import './chat.css';

const Chat = () => {
    const [chatSelected, setChatSelected] = useState(null)
    const [publicOrPrivateSelected, setPublicOrPrivateSelected] = useState(null);
    const [leavedChat, setLeavedChat] = useState(null)
    const [chats, setChats] = useState(localStorage.getItem("private_chats")?JSON.parse(localStorage.getItem("private_chats")):[])
    const [privateMessages, setPrivateMessages] = useState(localStorage.getItem("private_messages")?JSON.parse(localStorage.getItem("private_messages")):{})
    const [publicMessages, setPublicMessages] = useState(localStorage.getItem("public_messages")?JSON.parse(localStorage.getItem("public_messages")):{})
    const [usernameNewMsg, setUsernameNewMsg] = useState('')
    const [newMessage, setNewMessage] = useState(null)

    const handleChatSelect = (chat, pubOrPriv) => {
        if (chat.username == usernameNewMsg) {
            setUsernameNewMsg('')
        }
        setChatSelected(chat)
        setPublicOrPrivateSelected(pubOrPriv)
        
    }
    
    useEffect(()=>{
        waitOnPrivateMessage(setNewMessage)
        console.log("wait")
    }, [])

    useEffect(()=>{
        if (newMessage){
            if (chats.every(chat => chat.username != newMessage.username) || (chats.length == 0)){
                setChats([...chats, {username: newMessage.username, userID: newMessage.userID}])
                setPrivateMessages({...privateMessages, [newMessage.username]: [{sender:newMessage.username, text:newMessage.text}]})
            
            }
            else {
            console.info(privateMessages)
            setPrivateMessages({...privateMessages, [newMessage.username]: [...privateMessages[newMessage.username], {sender:newMessage.username, text:newMessage.text}]})
            }
            console.info(newMessage)
            //localStorage.setItem(JSON.stringify())
            if (!chatSelected || newMessage.username!=chatSelected.username){
                setUsernameNewMsg(newMessage.username)
            }
            
        }

    }, [newMessage])

    

    return (
        <div className='chat'>
            <RoomsBar chatSelectHandler={handleChatSelect} chatSelected= {chatSelected} leavedChat={leavedChat} chats={chats} setChats={setChats} usernameNewMsg={usernameNewMsg}/>
            {chatSelected ? <CurChat chatSelected={chatSelected} setChatSelected={setChatSelected} publicOrPrivateSelected={publicOrPrivateSelected} 
            setLeavedChat={setLeavedChat} chats={chats} setChats={setChats}  privateMessages={privateMessages} setPrivateMessages={setPrivateMessages}
            publicMessages={publicMessages} setPublicMessages={setPublicMessages}/> : <p className="hint">Start new chat or join to an existing one!</p>} </div>
    );
};

export default Chat;