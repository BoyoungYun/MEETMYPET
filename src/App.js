import Main from "./main.js";
import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';
function App() {
  return (
    <div className="App">
      <Routes>
          <Route path='/' element={<Main/>}/>
      </Routes>
    </div>
  );
}

export default App;
