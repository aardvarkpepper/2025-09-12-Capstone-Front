import { Form } from '../components/Form';
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
  return (<></>)
}

export { Sub }