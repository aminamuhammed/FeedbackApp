import './App.css'
import { Routes, Route } from 'react-router-dom';
import AddFeedback from './components/AddFeedback'
import Home from './components/Home'
import Navbar from './components/Navbar';
import EditFeedbackPage from './components/EditFeedbackPage';

function App() {

  return (
    <>
      <Navbar/>
       <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/addfeedback' element={<AddFeedback/>}/>
        <Route path="/edit-feedback" element={<EditFeedbackPage />} />
      </Routes>
    </>
  )
}

export default App
