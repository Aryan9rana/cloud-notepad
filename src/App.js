import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import Notes from './components/Notes';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
function App() {
  const [alert , setAlert]= useState(null);
  const showAlert=(type, message)=>{
    setAlert({
      msg:message,
      type:type
    });
    setTimeout(()=>{
      setAlert(null);
    },2000);
  }
  return (
    <>
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <div className="container my-3">

        <Alert alert={alert}/>
        </div>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Notes showAlert={showAlert}/>} />
            <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;
