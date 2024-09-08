import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard'
import Login from './components/Login';
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/ResetPassword';
import Signup from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
 

  return (
    <>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgetpassword' element={<ForgetPassword />}/>
        <Route path='/reset-password/:token' element={<ResetPassword />}/>
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        <Route path='*' element={<Login/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
