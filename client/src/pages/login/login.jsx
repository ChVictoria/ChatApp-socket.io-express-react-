import {React, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css'
import {connectToServer} from '/src/api_to_server.js'

const Login = ({}) => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")

    const handleEnter = (event) => {
        event.preventDefault()
        connectToServer(username)
        localStorage.setItem("username", username)
        navigate("/chat")
    }

    return (
        <div className={styles.box}>
            <form onSubmit={handleEnter} className={styles.login_form}>
                <h2>Enter your nickname:</h2>
                <input type="text" id="username" pattern='[a-zA-Z1-9_]*' value={username} onChange={(event) => setUsername(event.target.value)} required/>
                <button type="submit" className={styles.enter_btn}> Enter </button>
            </form>
        </div>
    );
};

export default Login;