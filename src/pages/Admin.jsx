import { Form } from '../components/Form';
import { useEffect, useState } from 'react';

/**
 * 
| Operation | Path | Function |
| --- | --- |---|
| GET | /admin/users | Lists all users |
| PUT | /admin/users/:id | Edits a specific user's info |
| DELETE | /admin/users/:id | Deletes a specific user |
| GET | /admin/ools | Lists all Order Of Losses |
| POST | /admin/ools | Create a new Order of Loss |
| PUT | /admin/ools/:id | Edit a specific Order Of Loss |
| DELETE | /admin/ools/:id | Delete a specific Order of Loss |
| GET | /admin/userlinks | Lists all userlinks |
| PUT | /admin/userlinks/:id | Edits a specific userlink |
| DELETE | /admin/userlinks/:id | Deletes a specific userlink
Probably pop this in Outlet later - if that's correct.
 */

const Admin = ({ user, jwt }) => {
  const [outputData, setOutputData] = useState({}); // technically ought to be a stringified object, but I think React may render it all right.  Eh, type coercion.
  const [outputDataLabel, setOutputDataLabel] = useState("");

  if (user.role !== "admin") {
    return <div>Current user does not have role 'admin'.  Please register if necessary, then log in with a profile that has 'admin' role</div>
  }

  // routeString e.g. '/admin/users'
  const getData = async (routeString) => {
    try {
      const response = await fetch(import.meta.env.VITE_SERVER_ORIGIN + routeString, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        },
        // body: JSON.stringify(user) // just don't need it.
      });
      const data = await response.json();
      setOutputData(data);

      setOutputDataLabel(routeString);
    } catch (error) {
      console.error('Home.jsx, error in /register or login attempt.')
    }
  }

  return (<div>
    <div>
      <button onClick={() => getData('/admin/users')}>Get User Data</button>
      <button onClick={() => getData('/admin/ools')}>Get OOL Data</button>
      <button onClick={() => getData('/admin/userlinks')}>Get Userlinks Data</button>
    </div>

    <div>
      {outputDataLabel}
    </div>
    <div>
      {Object.keys(outputData).length === 0 ? null : JSON.stringify(outputData)}
    </div>
  </div>)
}

export { Admin }