import React from 'react'
import styles from './styles.module.css'

const ManageBar = ({chatSelected, setChatSelected, setLeavedChat}) => {

    const handleLeave = () => {
        setLeavedChat(chatSelected)
        console.info(chatSelected)
        setChatSelected(null)
        
    }

    return (
        <>
            <div className={styles.header} >
                {chatSelected.username}
                <button className={styles.leaveBtn} onClick={handleLeave}>Leave</button>
            </div>
        </>
    );
};

export default ManageBar;