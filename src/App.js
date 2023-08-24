import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Layouts/Header';
import Home from './components/Home/Home';
import Plant from './components/Plant/Plant';
import Filter from './components/Filter/Filter';
import AdminPanel from './components/Admin/AdminPanel';
import ProtectedRoutes from './access/ProtectedRoutes';
import AccessRoute from './access/AccessRoute';
import { ROLE_ADMIN } from './utils/constants';
import AdminUser from './components/Admin/UserPanel/User';
import AuthVerify from './access/AuthVerify';
import Profile from './components/Profile/Profile';
import FavouriteList from './components/FavouriteList/FavouriteList';
import SupplierAdmin from './components/Admin/SupplierPanel/Supplier';
import SupplierCatalog from './components/Supplier/SupplierCatalog';
import ChangeLog from './components/ChangeLog/ChangeLog';

import AddPlant from './components/Admin/PlantPanel/AddPlant';
import UpdatePlant from './components/Admin/PlantPanel/UpdatePlant';
import Supplier from './components/Supplier/Supplier';

function App() {

  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="/" element={<Home />} ></Route>
          <Route path="/plant/:id" element={<Plant />} ></Route>
          <Route path="/filter" element={<Filter />} ></Route>
          <Route path="/filter/:keyword" element={<Filter />} ></Route>
          <Route path="/supplier" element={<SupplierCatalog />} ></Route>
          <Route path="/supplier/:id" element={<Supplier />} ></Route>

          <Route element={<ProtectedRoutes />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/favourite' element={<FavouriteList />} />
          </Route>

          <Route path="changelog"
            element={<AccessRoute role={ROLE_ADMIN}
              to={<ChangeLog />}
              redirect={<Navigate to={"/"} />} />} />

          <Route path="/admin" element={<ProtectedRoutes />}>
            <Route path='/admin'
              element={<AccessRoute role={ROLE_ADMIN}
                to={<AdminPanel />}
                redirect={<Navigate to={"/"} />} />} />

            <Route path="plant/:id"
              element={<AccessRoute role={ROLE_ADMIN}
                to={<UpdatePlant />}
                redirect={<Navigate to={"/"} />} />} />

            <Route path="plant/new"
              element={<AccessRoute role={ROLE_ADMIN}
                to={<AddPlant />}
                redirect={<Navigate to={"/"} />} />} />

            <Route path="user/:id"
              element={<AccessRoute role={ROLE_ADMIN}
                to={<AdminUser />}
                redirect={<Navigate to={"/"} />} />} />

            <Route path="supplier/:id"
              element={<AccessRoute role={ROLE_ADMIN}
                to={<SupplierAdmin />}
                redirect={<Navigate to={"/"} />} />} />

          </Route>
        </Route>
      </Routes>
      <AuthVerify />

    </div>
  );
}
export default App;
