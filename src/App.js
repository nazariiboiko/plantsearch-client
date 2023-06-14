import './App.css';
import {Route, Routes} from 'react-router-dom'
import Header from "./components/layouts/Header";
import Home from './components/home/Home';
import Plant from './components/plant/Plant';
import Filter from './components/filter/Filter';

function App() {

  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Header/>}>
          <Route path="/" element={<Home/>} ></Route>
          <Route path="/plant/:id" element={<Plant/>} ></Route>
          <Route path="/filter" element={<Filter/>} ></Route>
        </Route>
      </Routes>

    </div>
  );
}
export default App;
