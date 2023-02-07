import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AdminRead = () => {

    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            let response = await axios.get('/api/users');
            return (setApiData(await response.data));
        }
        getData();
    }, [])

    const storeDataLocallyForUpdation = async (data) => {
        let { _id, name, email, password, role } = await data;
        sessionStorage.setItem('ID', _id);
        sessionStorage.setItem('Name', name);
        sessionStorage.setItem('Email', email);
        sessionStorage.setItem('Password', password);
        sessionStorage.setItem('Role', role);
    }

    const deleteDataFromApi = async (_id) => {
        let deleteData = await axios.delete(`/api/users/${_id}`);
        if (deleteData) {
            getDataAfterDeleted();
        }
    }

    const getDataAfterDeleted = async () => {
        let responseAfterDeleted = await axios.get('/api/users')
        return setApiData(await responseAfterDeleted.data);
    }

    return (
        <>
            <div className="container-fluid text-center blog-home">
                <div className="row">
                    {apiData.map((data, index) => {
                        return (
                            <div key={index} className="col-lg-6">
                                <div className="card container" style={{ width: '100%' }}>
                                    <div className="card-body">
                                        <h5 className="card-title">{data.name}</h5>
                                        <p className='card-text'>{data.email}</p>
                                        <p className='card-text'>{`Role : ${data.role}`}</p>
                                        <Link to={'/update'}>
                                            <button onClick={() => { storeDataLocallyForUpdation(data) }} className="ui  button" style={{ width: '50%' }}>Update</button>
                                        </Link>
                                        <button onClick={() => { deleteDataFromApi(data._id) }} className="ui teal button" style={{ width: '50%' }}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default AdminRead