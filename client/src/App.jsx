// Style Imports
import './App.css';

// Component Imports
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {

  return (
    <div className="App d-flex flex-column align-items-center w-100">
    <Router>
      <div className="app-content">
        {/** Place Navigation Here */}
          <Routes>
            {/** Place Routes Here */}
          </Routes>
        {/** Place Footer Here */}
      </div>
    </Router>
    </div>
  );
}

export default App;
