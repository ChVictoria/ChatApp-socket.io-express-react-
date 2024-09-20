import React from 'react'
import styles from './styles.module.css'

const Participants = ({}) => {
    return (
        <div className='Participants'>
            <h2>Participants</h2>
            <ul className={styles.participantsList}>
                <li> Joe </li>
                <li> Bobby </li>
                <li> Mike </li>
            </ul>
        </div>
    );
};

export default Participants;