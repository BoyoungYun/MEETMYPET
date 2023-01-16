import './App.css';
import Main from "./main.js";
import { Route, Routes } from "react-router-dom";
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
