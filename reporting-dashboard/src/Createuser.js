import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Createuser() {
    const[name, setName]= useState('')
    const[email, setEmail]= useState('')
const navigate = useNavigate();


    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:8081/Create',{name,email})
        .then(res =>{
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
                <form onSubmit={handleSubmit}>
                    <h2>Add User</h2>
                    <div className='mb-2'>
                        <label htmlFor="name">Name: </label>
                        <input type="text"   id="name" placeholder='Enter Name'  className='form-control' required onChange={e =>setName(e.target.value)} />
                        
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="email">Email: </label>
                        <input type="email"   id="email" placeholder='Enter Email' className='form-control' required   onChange={e =>setEmail(e.target.value)}/>
                      
                    </div>
                    <button type='submit' className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Createuser;