import { Form } from '../components/Form';
import { URL } from '../constants/constants';

// const Form = ({ formObject = {}, setSomeState, callAPI }) 

const Home = ({ user, setJwt, setUser }) => {
  if (user && user.role !== "") {
    return <div>It seems a user is already logged in.  Please navigate to /sub or /admin depending on your role.</div>
  }
  // If user.role === "", register and login show.
  // if user.role === "sub" or "admin", they ought to be looking at another page.  Probably useNav later.

  // Hm . . . so maybe pop functions in util, then reference them in sections.  But then again functionality is split among files, and register/login user really doesn't need to be replicated.  But *could* use some sort of useFetch reusable code.  Eh.
  const registerAndLoginUser = async (formData) => {
    // register
    try {
      const response = await fetch(import.meta.env.VITE_SERVER_ORIGIN + '/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('/register failed.')
      }
      const data2 = await response.json();
      localStorage.setItem('user', JSON.stringify(data2.user));
      setUser(data2.user);

      const response2 = await fetch(import.meta.env.VITE_SERVER_ORIGIN + '/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!response2.ok) {
        throw new Error('/login failed')
      }
      const data = await response2.json();
      localStorage.setItem('jwt', data.token); // rework back end so it's uniformly structured in data structures.  Look up common data structures.  Note that data.token is a string, so should not require JSON.stringify.
      setJwt(data.token);

      return data.user; // 
    } catch (error) {
      console.error('Home.jsx, error in /register or login attempt.')
      throw new Error('Home.jsx to Form error'); // caught in Form.jsx. Actually, I don't want to halt execution, as I could get an error if Fetch attempts to use nonexistent user - something like that.  Clean this up later.
    }
  };
  return (
    <>
      {(user && user.role !== "") ? <div>If a user is logged in, they may not be logged in with 'sub' or 'admin' role.  Please register a new user with 'sub' or 'admin' role and log in.</div> : null}
      {(user && user.role === "") ? <Form formObject={user} setSomeState={setUser} callAPI={registerAndLoginUser} title={'Register and Login'} user={user}/> : null}
    </>
  )
}

export { Home }