import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MedicineList from './components/MedicineList';
import AddMedicine from './components/AddMedicine';
import WelcomePage from './components/WelcomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage/>}/>
        <Route path="/add" element={<AddMedicine/>}/>
      </Routes>
    </Router>
  );
}

export default App;