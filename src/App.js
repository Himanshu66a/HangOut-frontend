import React from 'react'
import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Loading from './loading/Loading';
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
const LazyProfile = React.lazy(() => import('./pages/profile/Profile'))
const LazyMessenger = React.lazy(() => import('./pages/messenger/Messenger'))

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Routes>

      <Route exact path="/" element={user ? <Home /> : <Register />} />

      {
        user ? <Route exact path="/" element={<Home />} /> :
          <Route path="/login" element={<Login />} />

      }

      <Route path="/login" element={user ? <Home /> : <Login />} />

      <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />

      <Route path="/profile/:username" element={<React.Suspense fallback={<Loading/>}>
        <LazyProfile />
      </React.Suspense>
      } />

      <Route path="/messenger" element={
        <React.Suspense fallback={<Loading/>}>
        <LazyMessenger />
      </React.Suspense>} />
    </Routes>
  );
}

export default App;
