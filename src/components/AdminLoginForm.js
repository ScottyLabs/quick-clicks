import React, {useState} from 'react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react';

//PROPS: none
const AdminLoginForm = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const postURL = process.env["REACT_APP_SERVERURL"] + "/auth/login";
    const [loading, setLoading] = useState(false);
    const [isIncorrectLogin, setIncorrectLogin] = useState(false);

    const handleAuthSubmit = (e) => {
        //the page refreshes on default: to disable, use line below:
        e.preventDefault();

        const currentUser = {username: username, password: password};
        setLoading(true);

        axios.post(postURL, currentUser)
            .then((res) => {
                console.log(res);
                setIncorrectLogin(false);
                
                setLoading(false);
            }, (err) => {
                setLoading(false);
                setIncorrectLogin(true);
                console.log(err.response.status);
            });
    };

    return (
        <Container>
          <h3>Admin Login Form</h3>
            <form onSubmit={handleAuthSubmit}>
                <p>Enter your username:</p>
                <input type = "text"
                        name = "username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    ></input>
                <br></br>
                <br></br>
                <p>Enter your password:</p>
                <input type = "text"
                        name = "password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                <br></br>
                <br></br>
                <br></br> 
                { !loading && <button>Login</button> }
                { loading && <button disabled> Authenticating... </button> }
            </form>
            <br></br>
            {isIncorrectLogin && <p>Incorrect user or password</p>}

        </Container>
      );
}
 
export default AdminLoginForm;