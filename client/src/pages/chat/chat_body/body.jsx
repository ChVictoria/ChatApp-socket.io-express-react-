import React from 'react'
import MessageList from './messages/list';
import ManageBar from './chat_manage_bar/chat_manage';
import MessageInput from './message_input_bar/message_input_bar';
import Participants from './participants/participants';
import './Body.css';


const CurChat = ({chatSelected, setChatSelected, publicOrPrivateSelected, setLeavedChat, privateMessages, setPrivateMessages, publicMessages, setPublicMessages}) => {


    return (
        
        <div className="CurChat">
            <div className="chat_body">
            <ManageBar chatSelected={chatSelected} setChatSelected={setChatSelected} setLeavedChat={setLeavedChat}/>
            <MessageList messages={publicOrPrivateSelected ? publicMessages : privateMessages} chat={chatSelected}/>
            <MessageInput setMessages={publicOrPrivateSelected ? setPublicMessages : setPrivateMessages} messages={publicOrPrivateSelected ? publicMessages : privateMessages} chat={chatSelected}/>
            </div>
            {publicOrPrivateSelected ? <Participants/> : <></>}
        </div> 
      
    );
};

export default CurChat;