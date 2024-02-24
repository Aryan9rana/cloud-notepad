import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import Alert from './components/Alert';
import NoteState from './context/notes/NoteState';
function App() {
  return (
    <>
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <Alert msg="this is alert"/>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
          </Routes>
        </div>
      </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;
