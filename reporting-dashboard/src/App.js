import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route }from 'react-router-dom'
import User from './User';
import Createuser from './Createuser';
import UpdateUser from './UpdateUser';

import DataMigration from './dataMigration'; 

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<User />}></Route>
        <Route path='/Create' element={<Createuser />}></Route>
        <Route path='/update/:id' element={<UpdateUser />}></Route>

        <Route path="/data-migration" element={<DataMigration />} />

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
