import React, { useState } from 'react';
import axios from 'axios';

function DataMigration() {
  const [migrationStatus, setMigrationStatus] = useState('');

  const handleDataMigration = async () => {
    try {
     
      await axios.post('http://localhost:8081/migrateData'); 

      setMigrationStatus('Data migration was successful.');
    } catch (error) {
      setMigrationStatus('Data migration failed. Please check the server logs.');
    }
  };

  return (
    <div>
      <h2>Data Migration</h2>
      <button onClick={handleDataMigration}>Migrate Data</button>
      <p>{migrationStatus}</p>
    </div>
  );
}

export default DataMigration;
