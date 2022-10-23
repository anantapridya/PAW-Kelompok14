import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MedicineList from './components/MedicineList';
import AddMedicine from './components/AddMedicine';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MedicineList/>}/>
        <Route path="/add" element={<AddMedicine/>}/>
      </Routes>
    </Router>
  );
}

export default App;