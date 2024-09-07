import { useState } from 'react'
// import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard'
import Redirect from './components/Redirect';
// import Register from './components/Register';
import Login from './components/Login';
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/ResetPassword';
// import AccountVerify from './components/AccountVerify';
import Signup from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
 

  return (
    <>
    {/* <Url /> */}
    {/* <TodoInput /> */}
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        {/* <Route path="/verify-account/:token" element={<AccountVerify />} /> */}
        <Route path='/forgetpassword' element={<ForgetPassword />}/>
        <Route path='/reset-password/:token' element={<ResetPassword />}/>
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        {/* <Route path="/redirect/:shortUrl" element={<Redirect />} /> */}
        <Route path='*' element={<Login/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
