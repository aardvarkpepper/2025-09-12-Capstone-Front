// Each call on this ought to create a separate form with separate state.  Confirm later (current implementation doesn't require multiple form display simultaneously)

import { useEffect, useState } from 'react';

const Form = ({ formObject = {}, setSomeState }) => { // really have to change 'setSomeState', oof, not a great name.
  const [formData, setFormData] = useState({});

  // on loading component, populates state formData with formObject
  useEffect(() => {
    setFormData(prev => {
      return formObject;
    });
  }, [formObject])

  const handleChange = (event) => {
    const { name, value } = event.target; // deconstructing
    setFormData(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  // I mean . . . right?
  const handleSubmit = (event) => {
    event.preventDefault();
    setSomeState(formData);
  }

  if (Object.keys(formObject).length === 0) { // technically formObject should never be empty; after all there's a default.  So no need to test !formObject
    return <div>Form.jsx will not populate a form if the form object argument is an empty object.</div>
  }

  // note:  wrap [key, value] in () or else.
  // remember React doesn't require an explicit return inside .map even with multi-line input.  Think it's in the airBnB React style guide; it's not a 'problem' to just pop in <div> without an explicit return.  I think.  Look it up, I must not be remembering quite correctly - maybe the reference is returning something on the same line e.g.
  // .map(element => {objectthingy}) returns, as opposed to
  // .map (element => {
    // return {objectthingy}
  // })

  const convertCamelCaseToReadable = (stringInput) => {
    // used Gemini AI for the replacement function.  Could iterate through the string but eh.  Probably ought to make a standardized library for case conversion and css library.  Note for later.
    return stringInput.replace(/([A-Z])/g, ' $1').replace(/^./, (firstChar => firstChar.toUpperCase()));
  }

  // note - switch over to HTMLValidators or whatever that thing is.  Also change input type 'text' to properly reflect email, password, etc.

  console.log(Object.entries(formData).map((key, value) => `Line: ${key}, ${value}`))
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {Object.entries(formData).map(([key, value]) => {
          return (<div key = {key}>
            <label htmlFor={key}>
              {convertCamelCaseToReadable(key)}
            </label>
            <input
              type="text"
              id={key}
              name={key}
              value={value || ""} // should have empty string but just in case
              onChange={handleChange}
            />
          </div>)
        })}
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )

}

export { Form }