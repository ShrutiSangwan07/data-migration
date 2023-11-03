import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


function UpdateUser() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate();
    const { id } = useParams();


    useEffect(() => {
        axios.get(`http://localhost:8081/${id}`)
            .then(res => {
                const user = res.data[0];
                setName(user.username);
                setEmail(user.email);
            })
            .catch(err => console.log(err));
    }, [id]);

    function handleSubmit(event) {
        event.preventDefault();
        axios.put(`http://localhost:8081/update/${id}`, { name, email })
            .then(res => {
                console.log(res);
                navigate("/")
            })
            .catch(err => {
                console.log(err)
            });
    }
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={ handleSubmit }>
                    <h2>Update User</h2>
                    <div className='mb-2'>
                        <label htmlFor="name">Name: </label>
                        <input type="text" id="name" placeholder='Enter Name' className='form-control' required onChange={ e => setName(e.target.value) } />

                    </div>
                    <div className='mb-2'>
                        <label htmlFor="email">Email: </label>
                        <input type="email" id="email" placeholder='Enter Email' className='form-control' required onChange={ e => setEmail(e.target.value) } />

                    </div>
                    <button type='submit' className='btn btn-success'>Update</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateUser;