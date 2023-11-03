import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom"

function User() {
    const [Users, setUsers] = useState([])

    const [migrationStatus, setMigrationStatus] = useState(''); 

    useEffect(() => {
        axios.get('http://localhost:8081/')
            .then(res => setUsers(res.data))
            .catch(err => console.log(err));
    }, [])


const handleDelete = async (id) => {
try {
    await axios.delete('http://localhost:8081/user/' + id)
    console.log("User deleted successfully");
    window.location.reload()
}
catch(err){
    console.log(err);
}
}


const handleDataMigration = async () => {
    try {
      await axios.post('http://localhost:8081/migrateData'); 
      setMigrationStatus('Data migration was successful.');
    } catch (error) {
      setMigrationStatus('Data migration failed. Please check the server logs.');
    }
  };


    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-item-center'>
            <div className='w-50 bg-white rounded p-3'>
                <Link to="/create" className='btn btn-success'>Add +</Link>

                <button onClick={handleDataMigration} className="btn btn-primary ms-2">
          Migrate Data
        </button> 
        <p>{migrationStatus}</p>

                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>E-mail</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Users.map((data, i) => (
                                <tr key={ i }>
                                    <td>{ data.username }</td>
                                    <td>{ data.email }</td>
                                    <td>
                                    <Link to={`update/${data.user_id}`} className="btn btn-primary">Update</Link>
                                        <button className="btn btn-danger ms-2" onClick={e => handleDelete(data.user_id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default User;