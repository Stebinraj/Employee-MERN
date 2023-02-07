import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UserRead = () => {

    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            let response = await axios.get('/api/users');
            if (response) {
                setApiData(await response.data);
            }
        }
        getData();
    }, [])

    return (
        <div className="container-fluid text-justify employee-home mt-3">
            <div className="row">
                {apiData.map((data, index) => {
                    if (data.role === "user") {
                        return (
                            <div key={index} className="col-md-6 col-lg-4">
                                <div className="card container mb-3 p-0 bg-light" style={{ maxWidth: '540px', border: '2px solid teal' }}>
                                    <div className="row g-0">
                                        <div className="col-md-4">
                                            <img src={require('../../assets/user-logo.png')} className="img-fluid rounded-start" alt="..." />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <br />
                                                <p className="card-text">{`Name : ${data.name}`}</p>
                                                <p className="card-text">{`Email : ${data.email}`}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default UserRead