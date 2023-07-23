import './App.css';
import { Navbar } from './components/Navbar';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./routes/HomePage";
import About from './routes/About';
import Services from './routes/Services2';
import Media from './routes/Media';
import Resources from './routes/Resources';
import Teaching from './routes/Teaching';
import Footer from './components/Footer';

export const serverURL = '/';

function App() {

  return (
    <div className="App d-flex flex-column align-items-center w-100">
    <Router>
      <div className="app-content">
        <Navbar />
          <Routes>
            <Route path="*" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/media" element={<Media />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/teaching" element={<Teaching />} />
          </Routes>
        <Footer />
      </div>
    </Router>
    </div>
  );
}

export default App;
