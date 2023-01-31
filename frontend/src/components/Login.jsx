import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Grid, Header, Segment } from 'semantic-ui-react';


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const authenticateUser = async () => {
        let users = await axios.post('http://localhost:5000/users', { email, password });
        if (users) {
            if (users.data === "Invalid Email Id" | users.data === "Invalid Passsword") {
                alert(users.data);
            }
            else {
                if (users.data.token) {
                    let token = users.data.token;
                    let id = users.data.data[0]._id;
                    let role = users.data.data[0].role;
                    let name = users.data.data[0].name;
                    sessionStorage.setItem("ID", id);
                    sessionStorage.setItem("Token", token);
                    sessionStorage.setItem("Role", role);
                    sessionStorage.setItem("Name", name);
                    if (users.data.data[0].role === "user") {
                        alert("Login Successfully!!!");
                        navigate('/users', { replace: true });
                    }
                    else {
                        if (users.data.data[0].role === "admin") {
                            alert("Login Successfully!!!");
                            navigate('/admins', { replace: true });
                        }
                    }
                }
            }
        }
    }

    return (
        <Grid textAlign='center' style={{ height: '100vh', background_color: '#f0f2f5' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header color='blue' textAlign='center'>
                    <h2>Login</h2>
                </Header>
                <Form size='large'>
                    <Segment>
                        <Form.Input fluid icon='mail' iconPosition='left' placeholder='Email' type='text' onChange={(e) => { setEmail(e.target.value) }} />
                        <Form.Input fluid icon='key' iconPosition='left' placeholder='Password' type='text' onChange={(e) => { setPassword(e.target.value) }} />
                        <button onClick={authenticateUser} className="ui primary button" style={{ width: '100%' }}>Login</button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    )
}

export default Login