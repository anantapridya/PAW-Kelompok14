import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import SigninSignup from './pages/SigninSignup';
import DescPage from './pages/DescPage';
import SignUp from './pages/SignUp';
import LoginUser from './pages/LoginUser';
import LoginAdmin from './pages/LoginAdmin';
import MedicineList from './pages/MedicineList';
import AddMedicine from './pages/AddMedicine';
import EditMedicine from './pages/EditMedicine';
import AddTransaction from './pages/AddTransaction';
import Page404 from './pages/Page404';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage/>}/>
        <Route path="/welcome" element={<SigninSignup/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/loginuser" element={<LoginUser/>}/>
        <Route path="/loginadmin" element={<LoginAdmin/>}/>
        <Route path="/list" element={<MedicineList/>}/>
        <Route path="/add" element={<AddMedicine/>}/>
        <Route path="/desc" element={<DescPage/>}/>
        <Route path="/edit" element={<EditMedicine/>}/>
        <Route path="/log" element={<AddTransaction/>}/>
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default App;