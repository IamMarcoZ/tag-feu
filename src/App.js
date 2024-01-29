import './App.css';
import Main from './components/main/Main';
import CustomNavbar from './components/customNavbar/CustomNavbar'
import { HashRouter, Route, Routes } from "react-router-dom";
import TableForEmail from './components/tableForEmail/TableForEmail';
import Table from './components/table/Table';
import DefectWip from './components/defectWip/DefectWip';
function App() {
  return (
    <div>
      <HashRouter >
        <CustomNavbar />
        <Routes>
          <Route path="/main" element={<Main />} />
          <Route path="/table" element={<Table />} />
          <Route path="/tableForEmail" element={<TableForEmail />} />
          <Route path="/defectsWip" element={<DefectWip />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
