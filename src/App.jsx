import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import { Dashboard } from './components/Dashboard';

import { Admin } from './pages/Admin';
import { Home } from './pages/Home';
import { Sub } from './pages/Sub';

import { Form } from './components/Form'; // testing

import { URL } from './constants/constants';

// note:  Back end on Render consistently gets 'Internal server error' for stuff with POST etc.  Probably this is due to needing to have stuff passed in with POST (register/login) and/or headers set.  Fix this; want a general purpose back end that can be accessed through browser that will display object-like data.

// Postman check on https://two025-09-12-capstone-back-2.onrender.com/register seems to work all right.  Probably have to double check how JWT is passed back and forth and such.

// npm run dev to start React from console.
// user: { username, email, password, role}
// ool: { commonName: {en: string}, description: {en: string}, ool: string}
// userlink: {user: userId, ool: oolId, nickname: string}
// https://medium.com/@lfoster49203/javascript-cors-cross-origin-resource-sharing-troubleshooting-6c2767530efe

function App() {

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    role: ""
  });
  // note - logout

  const [jwt, setJwt] = useState(""); // standardize; sometimes I'm referencing setJwt, sometimes setJWT.

  // put in something to clear localStorage later.
  // runs on load, retrieves JWT and user from localstorage.
  useEffect(() => {
    const retrieveJWT = localStorage.getItem('jwt');
    const retrieveUser = localStorage.getItem('user');

    // if token or user does not exist, set jwt and user to empty strings.  Shouldn't hurt.
    if (!retrieveJWT || !retrieveUser) {
      setUser({
        username: "",
        email: "",
        password: "",
        role: ""
      });
      setJwt("");
    }

    // if jwt is expired, we should get an error from backend.  We set user and jwt to empty strings and prompt them to log in again.

    try {
      // fetch with the JWT.  If it works, set user and jwt.
      const logmein = async () => {
        console.log('App.jsx logmein', retrieveUser);
        try {
          const response = await fetch(`${import.meta.env.VITE_SERVER_ORIGIN}/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${retrieveJWT}`
            },
            body: JSON.stringify(retrieveUser)
          });

          if (!response.ok) {
            throw new Error(`App.jsx error when attempting to login (POST)`)
          }
          // if there was an error, the throw prevents the following from being executed.  So if below runs, no errors.
          // const result = await response.json(); // we're not actually doing anything with the login return.  Logging in itself is the goal; we then set JWT and user in state.
          // Technically, the return should list the user, and we use that user - after all, the JWT in localStorage might not reflect the current user.
          setJwt(retrieveJWT);
          setUser(JSON.parse(retrieveUser)); // we got value from localStorage so it was a string that needs to be JSON.parsed into an object if we're going to pop an object in state.

        } catch (error) {
          console.error('App.jsx error when attempting to login (POST) - msg 2.  This may occur when attempting to incorrectly connect to the backend.')
        }
      }
      logmein();
      // fetch with the JWT.  If it works, set user and jwt.
    } catch (error) {
      // probably there was a JWT error.  Set user and jwt to empty strings; user is prompted to log in.
      console.error('Error in App.jsx useEffect; possible JWT expired.  Please log in again.')
      // possibly it's something like the user data doesn't conform to the backend data structure.  Note that for later.
    }
    // return cleanup function if applicable.
  }, [])

  return (
    <>
      <Dashboard user={user} setUser={setUser} />
      {/* <Form formObject={user} setSomeState={setUser}/> */}
      <BrowserRouter>
        <nav>
          <div>
            {user.role === "" ? <Link to="/">Register and Login</Link> : null}
          </div>
          <div>
            {user.role === "sub" ? <Link to="/subs">Subs</Link> : null}
          </div>
          <div>
            {user.role === "admin" ? <Link to="/admin">Admin</Link> : null}
          </div>
          <div>
            {user.role !== "" && user.role !== "sub" && user.role !== "admin" ? <div>User role must be empty string, sub, or admin.  Please update user profile.</div> : null}
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home user={user} setJwt={setJwt} setUser={setUser}/>} />
          <Route path="/sub" element={<Sub user={user} jwt={jwt}/>} />
          <Route path="/admin" element={<Admin user={user} jwt={jwt}/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

/**
 * Custom hooks are used effectively to abstract all reusable logic.
 * mod 17 lab 2
 * src-assets, components, pages, utilities
 */