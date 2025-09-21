import { useEffect, useState } from 'react';
import './App.css';
import { Dashboard} from './components/Dashboard.jsx';


// user: { username, email, password, role}
// ool: { commonName: {en: string}, description: {en: string}, ool: string}
// userlink: {user: userId, ool: oolId, nickname: string}

function App() {


  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    role: ""
  });
  // note - logout

  // runs on load, retrieves JWT from localstorage.
  useEffect(() => { }, [])

  return (
    <>
      <Dashboard user={user} setUser={setUser} />
    </>
  )
}

export default App

/**
 * Custom hooks are used effectively to abstract all reusable logic.
 * mod 17 lab 2
 * src-assets, components, pages, utilities
 */