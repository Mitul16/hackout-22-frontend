import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Protected from './protected'

import SideNav from './interface/SideNav/index'
import NoMatch from './pages/404/index'
import Dashboard from './pages/dashboard/index'
import ErrorPage from './pages/error/index'
import ForgetPassword from './pages/forgot-password/index'
import Login from './pages/login/index'
import Profile from './pages/profile/index'
import Register from './pages/register/index'

import { Toaster } from 'react-hot-toast'
import { getAccessToken } from './utils/API/index'

import "./styles/globals.css"

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(!!getAccessToken())

  useEffect(() => {
    const jwt_token = getAccessToken();
    console.log(jwt_token)
    if (jwt_token) setIsLoggedIn(true);
  }, [isLoggedIn])
  return (
    <div className="w-full flex">
      <Toaster />
      <Router>
        {isLoggedIn ? (
          <SideNav
            isLoggedIn={isLoggedIn}
          />
        ) : (
          ''
        )}
        <div className="relative w-full">
          <div className="flex-1">
            <Routes>
              <Route
                path="/"
                element={
                  <Protected isLoggedIn={isLoggedIn}>
                    <Dashboard />
                  </Protected>
                }
              />
              <Route
                path="login"
                element={
                  <Login
                    loginStatus={setIsLoggedIn}
                  />
                }
              />
              <Route path="register" element={ <Register />} />
              <Route path="forget-password" element={<ForgetPassword />} />
              <Route
                path="profile"
                element={
                  <Protected isLoggedIn={isLoggedIn}>
                    {' '}
                    <Profile dashboard={true} />{' '}
                  </Protected>
                }
              />
              <Route
                path="project"
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
          </div>
        </div>
      </Router>
    </div>
  )
}

export default App