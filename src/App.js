import './App.css';
import Home from './Home';
import Battle from './Battle';
import NotFound from './NotFound';
import {Route,Routes,Navigate} from "react-router-dom"

function App() {
  return (
    <div className="App">
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/battle" element={<Battle />} /> 
        <Route path="/battle/:battleId" element={<Battle />} />    
        <Route path="/404-Page" element={<NotFound />} />
        <Route path="*" element={<Navigate replace to="/404-Page" />} />
      </Routes>

    </div>
  );
}
export default App;
