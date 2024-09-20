import {React, useState }  from 'react'
import PublicChats from './public_chat_list'
import PrivateChats from './private_chat_list'
import styles from './styles.module.css'

const RoomsBar = ({chatSelectHandler, chatSelected, leavedChat, chats, setChats, usernameNewMsg}) => {
    const [publicOrPrivate, setPublicOrPrivate] = useState(0)

    return (
        <div className="RoomsBar">
            <div className={styles.switch}>
                <div className={styles.switchLabel}>
                    <label >
                        <input className={styles.radiobtn} type="radio" name='switch' onClick={()=>setPublicOrPrivate(1)} checked={publicOrPrivate}/> 
                        <span>Public</span> 
                    </label>
                </div>
                <div className={styles.switchLabel}>
                    <label>
                        <input className={styles.radiobtn} type="radio" name='switch' onClick={()=>setPublicOrPrivate(0)} checked={!publicOrPrivate}/> 
                        <span>Private</span> 
                    </label>
                </div>
            </div>
            {publicOrPrivate ? <PublicChats chatSelectHandler={chatSelectHandler} chatSelected= {chatSelected} leavedChat={leavedChat}/> : 
            <PrivateChats chatSelectHandler={chatSelectHandler} chatSelected= {chatSelected} leavedChat={leavedChat} chats={chats} setChats={setChats} usernameNewMsg={usernameNewMsg}/>}
        </div>
    );
};

export default RoomsBar;