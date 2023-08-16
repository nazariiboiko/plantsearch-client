import './App.css';
import {Navigate, Route, Routes} from 'react-router-dom';
import Header from './components/Layouts/Header';
import Home from './components/Home/Home';
import Plant from './components/Plant/Plant';
import Filter from './components/Filter/Filter';
import AdminPanel from './components/Admin/AdminPanel';
import ProtectedRoutes from './access/ProtectedRoutes';
import AccessRoute from './access/AccessRoute';
import { ROLE_ADMIN } from './utils/constants';
import AdminPlant from './components/Admin/PlantPanel/Plant';
import AdminUser from'./components/Admin/UserPanel/User';
import PlantPanel from './components/Admin/PlantPanel/PlantPanel';
import UserPanel from './components/Admin/UserPanel/UserPanel';
import SupplierPanel from './components/Admin/SupplierPanel/SupplierPanel';
import AuthVerify from './access/AuthVerify';
import Profile from './components/Profile/Profile';
import FavouriteList from './components/FavouriteList/FavouriteList';
import Supplier from './components/Admin/SupplierPanel/Supplier';
import SupplierCatalog from './components/Supplier/SupplierCatalog';

function App() {

  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Header/>}>
          <Route path="/" element={<Home/>} ></Route>
          <Route path="/plant/:id" element={<Plant/>} ></Route>
          <Route path="/filter" element={<Filter/>} ></Route>
          <Route path="/filter/:keyword" element={<Filter/>} ></Route>
          <Route path="/supplier" element={<SupplierCatalog/>} ></Route>
          
          <Route element={<ProtectedRoutes/>}>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/favourite' element={<FavouriteList/>}/>
          </Route>
          
          <Route path="/admin" element={<ProtectedRoutes/>}>
            <Route path='/admin'
                        element={<AccessRoute role={ROLE_ADMIN}
                                        to={<AdminPanel/>}
                                        redirect={<Navigate to={"/"}/>}/>}/>
            
            <Route path="plant" 
                        element={<AccessRoute role={ROLE_ADMIN}
                                        to={<PlantPanel/>}
                                        redirect={<Navigate to={"/"}/>}/>}/>

            <Route path="plant/:id" 
                        element={<AccessRoute role={ROLE_ADMIN}
                                        to={<AdminPlant/>}
                                        redirect={<Navigate to={"/"}/>}/>}/>
            
            <Route path="user" 
                        element={<AccessRoute role={ROLE_ADMIN}
                                        to={<UserPanel/>}
                                        redirect={<Navigate to={"/"}/>}/>}/>

            <Route path="user/:id" 
                        element={<AccessRoute role={ROLE_ADMIN}
                                                    to={<AdminUser/>}
                                                    redirect={<Navigate to={"/"}/>}/>}/>
            
            <Route path="supplier" 
                        element={<AccessRoute role={ROLE_ADMIN}
                                        to={<SupplierPanel/>}
                                        redirect={<Navigate to={"/"}/>}/>}/>
            
            <Route path="supplier/:id" 
                        element={<AccessRoute role={ROLE_ADMIN}
                                        to={<Supplier/>}
                                        redirect={<Navigate to={"/"}/>}/>}/>

          </Route>
        </Route>
      </Routes>
      <AuthVerify/>

    </div>
  );
}
export default App;
