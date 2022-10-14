import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Protected from './protected'

import NavBar from './components/navigation/NavBar'
import Dashboard from './pages/dashboard/index'
import Login from './pages/login/index'
import Register from './pages/register/index'
import Profile from './pages/profile/index'
import ForgetPassword from './pages/forgot-password/index'
import ErrorPage from './pages/error/index'
import NoMatch from './pages/404/index'

import { Toaster } from 'react-hot-toast'

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(true)
  const [isEmployer, setIsEmployer] = useState(false)
  const [employerId, setEmployerId] = useState(null)

  useEffect(() => {
    setIsEmployer(localStorage.getItem('isEmployer') === 'true' ? true : false)
    setEmployerId(localStorage.getItem('employerId'))
  }, [isEmployer, employerId, isLoggedIn])

  return (
    <>
      <Toaster />
      <Router>
        {isLoggedIn ? (
          <NavBar
            loginStatus={setisLoggedIn}
            isEmployer={isEmployer}
            employerId={employerId}
          />
        ) : (
          ''
        )}
        <Routes>
          {isLoggedIn ? (
            <Route
              path="dashboard"
              element={
                <Protected isLoggedIn={isLoggedIn}>
                  <Dashboard />
                </Protected>
              }
            />
          ) : (
            ''
          )}

          <Route
            path="login"
            element={
              <Login
                loginStatus={setisLoggedIn}
                setIsEmployer={setIsEmployer}
                setEmployerId={setEmployerId}
              />
            }
          />
          <Route path="register" element={<Register />} />
          <Route path="forget-password" element={<ForgetPassword />} />
          <Route
            path="profile"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                {' '}
                <Profile viewState="user" />{' '}
              </Protected>
            }
          />
          <Route
            path="profile/:id"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                {' '}
                <Profile viewState="view" />{' '}
              </Protected>
            }
          />
          <Route path="error" element={<ErrorPage />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
