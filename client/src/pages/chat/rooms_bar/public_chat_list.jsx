import React from 'react'
import styles from './styles.module.css'


const PublicChats = ({}) => {
    return (
        <>
            <ul className={styles.chatlist}>
                <li> News </li>
                <li> Questions </li>
                <li> Memes </li>
            </ul>
            <div className={styles.startNewChat}>
                <button>Join / Start a new chat</button>
            </div>
        </>
    );
};

export default PublicChats;