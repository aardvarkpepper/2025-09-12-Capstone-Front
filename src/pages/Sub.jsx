import { Form } from '../components/Form';
import { useEffect, useState } from 'react';
/**
 * 
| Operation | Path | Function |
| --- | --- |---|
| PUT | /subs/users/:id | Edit your user profile |
| DELETE | /subs/users/:id | Delete your user profile (yes, really) |
| GET | /subs/ools | Get your Order Of Losses |
| POST | /subs/ools | Create an Order of Loss |
 */

const Sub = ({ user, jwt }) => {
  if (user.role !== "sub") {
    return <div>Current user does not have role 'sub'.  Please register if necessary, then log in with a profile that has 'sub' role, or update profile.</div>
  }

  const [outputData, setOutputData] = useState({}); // technically ought to be a stringified object, but I think React may render it all right.  Eh, type coercion.
  const [outputDataLabel, setOutputDataLabel] = useState("");

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
      <button onClick={() => getData('/subs/ools')}>Get My OOL Data</button>
    </div>

    <div>
      {outputDataLabel}
    </div>
    <div>
      {Object.keys(outputData).length === 0 ? null : JSON.stringify(outputData)}
    </div>
  </div>)
}

export { Sub }