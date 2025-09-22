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
  // Think on this.  Ideally we should have a single function that processes data.  But we don't, because one data structure returns an array, another returns an object within an array.  This should be fixed.  Data structures really need reworking.

  const [displayForm, setDisplayForm] = useState(null);

  if (user && user.role !== "admin") {
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

  const editField = (event) => {};
  const deleteField = (event) => {};

  const outputDataToJSX = () => {
    if (outputData.length) {
      return outputData.map(element => {
        return (<div key={element._id}>
          <p>{`Username: ${element.username}, Email: ${element.email}, Role: ${element.role}`}</p>
          <button onClick={editField}>Edit</button>
          <button onClick={deleteField}>Delete</button>
        </div>)
      })
    } else if (outputData.ools) {
      return
    } else if (outputData.userLinks) {
      return
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
      <div>
        { }
      </div>
    </div>
  </div>)
}

export { Admin }

/**
 * also, pop in the create field.
 * _id, username, email, role.  We don't display password ofc.  Shouldn't get it from server, really.
 * user data:
 * 
 
 [{"_id":"68cc35a78ea08f2c101d5069","username":"Alice","email":"alice@yahoo.com","password":"$2b$10$whkgdB6V8H7Uf5o.en.SNutt7Q37OrTpUkVi..dzUn/Zp3npL8tAS","role":"admin","__v":0},{"_id":"68cc35f78ea08f2c101d506f","username":"Charlie","email":"charlie@yahoo.com","password":"$2b$10$MkCEuX..dwn6bNbSBSk1..IEPtGdEyOuLrj9qbGQbRI5oOvg07kGC","role":"user","__v":0},{"_id":"68cc3ce408ea92ac04c85d62","username":"Danica","email":"danica@yahoo.com","password":"$2b$10$WbmuxPC5yUQD8bJ575ftzO50E7dq8hCXZB/kv/TW.msH8ANCt7Ufi","role":"user","__v":0},{"_id":"68cc4ed57d45bd6823526749","username":"Bulma","email":"bulma@yahoo.com","password":"$2b$10$Ewj5J2X8Cny1f4MINxyaUuA3Yj2C8u.kNid6bJNu6lekm9n.cw/Ju","role":"sub","__v":0},{"_id":"68d077bcc2c6ed53af9b2dd5","username":"Echo","email":"echo@yahoo.com","password":"$2b$10$Na8amVd.jWKJvnp9C7EGquzp.bIOm0kTMjAhAroe3Lr1y05cgF/Gy","role":"admin","__v":0},{"_id":"68d0fc6a62fd24d808ecb3b7","username":"Hotel","email":"hotel@yahoo.com","password":"$2b$10$rxwq.7aNJl4oziH8gYfyIez6rYGM28toorX6TT7NrQYa9LMevNk9.","role":"admin","__v":0},{"_id":"68d0fcbd62fd24d808ecb3bb","username":"India","email":"india@yahoo.com","password":"$2b$10$PxTJtsDdH5chze1qwyXyU.y1aRFLBQtoqzeLgfLrM6o0tBCecLgWy","role":"admin","__v":0},{"_id":"68d11efe468fb1bafd580c43","username":"Juliet","email":"juliet@yahoo.com","password":"$2b$10$HlNYQWkREgoKlINeOIijeO5NI6ko4vlzzSj409A6jw6rPNGrl8XPi","role":"admin","__v":0},{"_id":"68d121c3468fb1bafd580c47","username":"Kilo","email":"kilo@yahoo.com","password":"$2b$10$bE4RjtZ68o8nszX5XcdqPeO76xCuk1M.MP.Cri0tbpUbVNpyMPNLO","role":"admin","__v":0},{"_id":"68d12806dd5133f0ec462f8b","username":"alpha","email":"alpha@yahoo.com","password":"$2b$10$Kuv0ynVrEllJayHYe0OXQ.fH060UFExZImMq5X6wmkEL.7vGlK5Oi","role":"admin","__v":0},{"_id":"68d12dd1aa07429a24bd6bfe","username":"Bravo","email":"bravo@yahoo.com","password":"$2b$10$mg7sIonkUGzH3hg3HMVmJOiV2b8Gq7QmgNc10p8kIih1hZ.uIUgSS","role":"admin","__v":0},{"_id":"68d134d2aa07429a24bd6c0d","username":"Aileen","email":"aileen@yahoo.com","password":"$2b$10$IKdTWO6CmOkz7bzt/gobBOcOAKa4bdqXLlhzooCyp5GnpJYi./p.O","role":"admin","__v":0},{"_id":"68d134f0aa07429a24bd6c14","username":"Barilow","email":"barilow@yahoo.com","password":"$2b$10$p7S8hhm.6HNTQ7yKtMx.ouT.B5D.NwP0bFcDLHHsHMPW5g0OnVSOa","role":"sub","__v":0},{"_id":"68d13549aa07429a24bd6c18","username":"Chazz","email":"chazz@academie.org","password":"$2b$10$bOTnVmtl7oxwR215htxIB.x6rjbqptcszoz8EnjzayIeaWTPP/BaW","role":"sub","__v":0},{"_id":"68d14420b18c721697dc40f5","username":"Yugi","email":"yugi@duelist.com","password":"$2b$10$wtnC.mjeh0Wb8sqlyriDE.mRYloJ4IDvQkIvUAgadJHimuXSoiqWa","role":"admin","__v":0},{"_id":"68d144d6b18c721697dc40fb","username":"Joey","email":"joey@wheeler.com","password":"$2b$10$UgwovvwnOKfWBzQgjUfpQOPfGHjZjDCBrNQ8IJ4neMzyH7Kw1at9.","role":"admin","__v":0},{"_id":"68d1454db18c721697dc4102","username":"kaiba","email":"kaiba@legend.com","password":"$2b$10$zHiMKAs3NimszAmqR2JmKu6HJtAhjm8m8C1sMdt3GlKdfwQYEU1Mu","role":"admin","__v":0},{"_id":"68d14560b18c721697dc4109","username":"mokba","email":"mokuba@yahoo.com","password":"$2b$10$DQA2ECLrvebugfMgNexrE..EeTfyJbdEg2d1EyEH/BwCkvmNQUC9q","role":"sub","__v":0},{"_id":"68d14d8711df874ccd72031a","username":"hamster3","email":"hamster3@yahoo.com","password":"$2b$10$oTWSW5gZ4w.8nDEGRpWmR.kqaYuM28L31lbvpsDfYSL6.vWW9u3AG","role":"admin","__v":0},{"_id":"68d14e5011df874ccd720322","username":"hamster4","email":"hamster@yahoo.com","password":"$2b$10$0zdGgrs34/ivZ2Doc8LpYeav4EIyx1aAh.YfDsZVDpT2X/3NVsUeC","role":"sub","__v":0},{"_id":"68d17ca7671df4f5d2bc571d","username":"Godzilla","email":"godzilla@tokyo.com","password":"$2b$10$CTuN5C6tXfWHzMnNg4PjBeNZW5X8mG4Abx4CRVs2e9/upf4Ze8iea","role":"admin
 * 
 ools:
 {"message":"All ools","ools":[{"_id":"68cc3a5b8ea08f2c101d5079","commonName":{"en":"Strongest"},"description":{"en":"Takes strongest defenders last"},"ool":"biatf","__v":0},{"_id":"68cc3a7b8ea08f2c101d507b","commonName":{"en":"Economic"},"description":{"en":"Takes most expensive defenders last"},"ool":"iatfb","__v":0},{"_id":"68cc3faa08ea92ac04c85d6c","commonName":{"en":"Test"},"description":{"en":"For Testing Purposes"},"ool":"tabif","__v":0},{"_id":"68cc51e6c3f4389bb1d62f8e","commonName":{"en":"68cc3a7b8ea08f2c101d507b"},"description":{"en":"68cc3a7b8ea08f2c101d507b"},"ool":"68cc3a7b8ea08f2c101d507b","__v":0},{"_id":"68cc528bf8f648a8495b6332","commonName":{"en":"68cc3a7b8ea08f2c101d507b"},"description":{"en":"68cc3a7b8ea08f2c101d507b"},"ool":"68cc3a7b8ea08f2c101d507b","__v":0},{"_id":"68cc52d2f8f648a8495b6334","commonName":{"en":"biatf"},"description":{"en":"biatf"},"ool":"biatf","__v":0}]}

userLinks: 
 {"message":"All userLinks","userLinks":[{"_id":"68cc4bc17d45bd6823526734","user":"68cc35f78ea08f2c101d506f","ool":"68cc3a5b8ea08f2c101d5079","nickname":"Charlie's Ultimate Defense","__v":0},{"_id":"68cc4bf67d45bd6823526736","user":"68cc35f78ea08f2c101d506f","ool":"68cc3a7b8ea08f2c101d507b","nickname":"Charlie's Ultimate Economy","__v":0},{"_id":"68cc4ca87d45bd682352673e","user":"68cc35a78ea08f2c101d5069","ool":"68cc3faa08ea92ac04c85d6c","nickname":"","__v":0},{"_id":"68cc55936c6bc1f3386a6fe2","user":"68cc4ed57d45bd6823526749","ool":"68cc3a7b8ea08f2c101d507b","nickname":"Bulma Econ","__v":0},{"_id":"68cc55ac6c6bc1f3386a6fe4","user":"68cc4ed57d45bd6823526749","ool":"68cc3a5b8ea08f2c101d5079","nickname":"Bulma Defense","__v":0}]}

  */