import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import MedicineList from './components/MedicineList';
import AddMedicine from './components/AddMedicine';
import LoginAdmin from './components/LoginAdmin';
import SignUp from './components/SignUp';
import LoginUser from './components/LoginUser';
import MedicineDesc from './components/MedicineDesc';
import EditMedicine from './components/EditMedicine';
import AddTransaction from './components/AddTransaction';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/loginuser" element={<LoginUser/>}/>
        <Route path="/loginadmin" element={<LoginAdmin/>}/>
        <Route path="/list" element={<MedicineList/>}/>
        <Route path="/add" element={<AddMedicine/>}/>
        <Route path="/desc" element={<MedicineDesc/>}/>
        <Route path="/edit" element={<EditMedicine/>}/>
        <Route path="/log" element={<AddTransaction/>}/>
      </Routes>
    </Router>
  );
}

export default App;