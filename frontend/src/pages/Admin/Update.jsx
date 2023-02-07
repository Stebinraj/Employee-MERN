import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import { Form, Grid, Header, Segment } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Update = () => {

    const [_id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const updateDataToApi = async () => {
        let putData = await axios.put(`/api/users`, { _id, name, email, password, role });
        if (putData) {
            navigate('/admins', { replace: true });
        }
    }

    useEffect(() => {
        setId(sessionStorage.getItem('ID'));
        setName(sessionStorage.getItem('Name'));
        setEmail(sessionStorage.getItem('Email'));
        setPassword(sessionStorage.getItem('Password'));
        setRole(sessionStorage.getItem('Role'));
    }, [])

    return (
        <>
            <AdminNavbar />

            <Grid textAlign='center' style={{ height: '85vh', background_color: '#f0f2f5' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header color='blue' textAlign='center'>
                    </Header>
                    <Form size='large'>
                        <Segment>
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='Name' type='text' onChange={(e) => { setName(e.target.value) }} value={name} />
                            <Form.Input fluid icon='mail' iconPosition='left' placeholder='Email' type='text' onChange={(e) => { setEmail(e.target.value) }} value={email} />
                            <Form.Input fluid icon='key' iconPosition='left' placeholder='Password' type='text' onChange={(e) => { setPassword(e.target.value) }} value={password} />
                            <Form.Input fluid icon='universal access' iconPosition='left' placeholder='Role - user or admin' type='text' onChange={(e) => { setRole(e.target.value) }} value={role} />
                            <button onClick={updateDataToApi} className="ui primary button" style={{ width: '100%' }}>Update</button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        </>
    )
}

export default Update