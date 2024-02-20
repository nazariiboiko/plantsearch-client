import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Layout/Header';
import Home from './components/Home/Home';
import AuthVerify from './access/AuthVerify';
import Plant from './components/Plant/Plant';
import Filter from './components/Filter/Filter';
import ProtectedRoutes from './access/ProtectedRoutes';
import AccessRoute from './access/AccessRoute';
import Profile from './components/Profile/Profile';
import FavoriteList from './components/FavoriteList/FavoriteList';
import { ROLE_ADMIN } from './utils/constants';
import AdminPanel from './components/Admin/AdminPanel';
import PlantCreateForm from './components/Admin/Plant/PlantCreateForm/PlantCreateForm';
import SupplierList from './components/Supplier/SupplierList';
import Supplier from './components/Supplier/Supplier';
import Gallery from './components/Gallery/Gallery';

function App() {
  return (
    <div className="App">
      <div className="custom-scrollbar">
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="/" element={<Home />} ></Route>
            <Route path="/plant/:id" element={<Plant />}></Route>
            <Route path="/filter" element={<Filter />}></Route>
            <Route path='/supplier' element={<SupplierList></SupplierList>}></Route>
            <Route path='/supplier/:id' element={<Supplier></Supplier>}></Route>
            <Route path='/gallery' element={<Gallery />} ></Route>

            <Route element={<ProtectedRoutes />}>
              <Route path='/profile' element={<Profile />} />
              <Route path='/favourite' element={<FavoriteList />} />
            </Route>

            <Route path="/admin" element={<ProtectedRoutes />}>
              <Route path='/admin'
                element={<AccessRoute role={ROLE_ADMIN}
                  to={<AdminPanel />}
                  redirect={<Navigate to={"/"} />} />} />

              <Route path="plant/:id"
                element={<AccessRoute role={ROLE_ADMIN}
                  to={<PlantCreateForm />}
                  redirect={<Navigate to={"/"} />} />} />

              <Route path="plant/new"
                element={<AccessRoute role={ROLE_ADMIN}
                  to={<PlantCreateForm />}
                  redirect={<Navigate to={"/"} />} />} />
            </Route>
          </Route>
        </Routes>
        <AuthVerify />
      </div>
    </div>
  );
}

export default App;
