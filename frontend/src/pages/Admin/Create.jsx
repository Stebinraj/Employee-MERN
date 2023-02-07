import React, { useState } from 'react';
import { Form, Grid, Header, Segment } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const sendDataToApi = async () => {
        let send = await axios.post('/api/user', { name, email, password, role });
        if (send) {
            navigate('/admins', { replace: true });
        }
    }

    return (
        <>
            <Grid textAlign='center' style={{ height: '85vh', background_color: '#f0f2f5' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header color='blue' textAlign='center'>
                    </Header>
                    <Form size='large'>
                        <Segment>
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='Name' type='text' onChange={(e) => { setName(e.target.value) }} />
                            <Form.Input fluid icon='mail' iconPosition='left' placeholder='Email' type='text' onChange={(e) => { setEmail(e.target.value) }} />
                            <Form.Input fluid icon='key' iconPosition='left' placeholder='Password' type='text' onChange={(e) => { setPassword(e.target.value) }} />
                            <Form.Input fluid icon='universal access' iconPosition='left' placeholder='Role - user or admin' type='text' onChange={(e) => { setRole(e.target.value) }} />
                            <button onClick={sendDataToApi} className="ui primary button" style={{ width: '100%' }}>Add User</button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        </>
    )
}

export default Create