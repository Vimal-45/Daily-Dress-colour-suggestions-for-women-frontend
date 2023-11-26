import React, { useEffect, useRef, useState } from 'react';
import { PersonCircle } from 'react-bootstrap-icons';
import country from '../country.json';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profileImgage, setImageUrl] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [file, setFile] = useState(null);
  console.log(file)
  

  const navigate = useNavigate()
  const myRef = useRef() 
console.log((profileImgage));
  useEffect(()=>{
    myRef.current.focus()         

},[])


  const handleInputChange = (setState) => (e) => {
    setState(e.target.value);
  };

  const saveImage = () => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'stvzpsmo');
    data.append('cloud_name', 'dwo49uopx');

    axios.post('https://api.cloudinary.com/v1_1/dwo49uopx/image/upload', data)
      .then(response => {
        
        console.log(response.data.secure_url);
        setImageUrl(response.data.secure_url)
      })
      .catch(error => {
        
        console.error(error);
      });
  };
  

  const handleSubmit = (e) => {
    console.log(profileImgage);
    e.preventDefault();
 
    if (!username || !password || !email || !selectedCountry || !streetAddress || !city || !region || !profileImgage || !profileImgage) {
      alert('Please fill in all required fields.');
      return;
    }
    axios.post('https://project-name-backend-4jrk.onrender.com/api/user/register', {
      username: username, 
      firstName: firstName,
      lastName: lastName,
      email: email,
      Country: selectedCountry,
      Address: streetAddress,
      city: city,
      region: region,
      postalCode: postalCode,
      password: password,
      profileImage: profileImgage
    })
      .then(res => {
        alert(res.data.message)      
        
      }).catch(err => {
        console.log(err);

      })

    setUsername('')   
    setFile(null)
    setFirstName('')
    setLastName('')
    setEmail('')
    setSelectedCountry('')
    setStreetAddress('')
    setCity('')
    setRegion('')
    setPostalCode('')
    
    navigate('/signin')   


  };

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="relative flex h-16 bg-gray-800 text-white items-center justify-center text-lg font-serif">
        SIGN UP
      </div>

      <div className="flex items-center bg-gray-800  justify-center">
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 bg-transparent text-white">Profile</h2>
              <p className="mt-1 text-sm leading-6 text-gray-500">
                This information will be displayed publicly so be careful what you share.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="username" className="block text-sm font-medium leading-6 bg-transparent text-white">
                    Username
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span> */}
                      <input
                        ref={myRef}
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="username"
                        className="block flex-1 border-10  py-1.5 pl-1 bg-transparent text-white placeholder:text-gray-600 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Ex: Vimal@123"
                        value={username}
                        onChange={handleInputChange(setUsername)}

                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label htmlFor="username" className="block text-sm font-medium leading-6 bg-transparent text-white">
                    Set your Password
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span> */}
                      <input
                        type="text"
                        name="password"
                        id="password"
                        autoComplete="password"
                        className="block flex-1 border-10  py-1.5 pl-1 bg-transparent text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        // placeholder="Ex: Vimal@123"
                        value={password}
                        onChange={handleInputChange(setPassword)}

                      />
                    </div>
                  </div>
                </div>



                <div className="col-span-full">
                  <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 bg-transparent text-white">
                    Cover photo
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <PersonCircle className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                      <div className="mt-4 flex text-sm leading-6 text-gray-500">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={saveImage}
                          />
                        </label>
                        <p className="pl-1"> {file ? file.name : 'No file selected'} </p>
                      </div>
                      <p className="text-xs leading-5 text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 bg-transparent text-white">Personal Information</h2>
              <p className="mt-1 text-sm leading-6 text-gray-500">Use a permanent address where you can receive mail.</p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm font-medium leading-6 bg-transparent text-white">
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-10 py-1.5 bg-transparent text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={firstName}
                      onChange={handleInputChange(setFirstName)}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="last-name" className="block text-sm font-medium leading-6 bg-transparent text-white">
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-10 py-1.5 bg-transparent text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={lastName}
                      onChange={handleInputChange(setLastName)}
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 bg-transparent text-white">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-10 py-1.5 bg-transparent text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={email}
                      onChange={handleInputChange(setEmail)}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="country" className="block text-sm font-medium leading-6 bg-transparent text-white">
                    Country
                  </label>
                  <div className="mt-2">
                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      value={selectedCountry}
                      onChange={handleInputChange(setSelectedCountry)}
                      className=" w-full rounded-md border-10 py-1.5 text-green shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      {country.map((Item, index) => {

                        return (
                          <>

                            <option key={index} value={Item.name} >

                              {Item.name}
                            </option>
                          </>
                        )
                      })

                      }
                    </select>
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="street-address" className="block text-sm font-medium leading-6 bg-transparent text-white">
                    Street address
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="street-address"
                      id="street-address"
                      autoComplete="street-address"
                      className="block w-full rounded-md border-10 py-1.5 bg-transparent text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={streetAddress}
                      onChange={handleInputChange(setStreetAddress)}

                    />
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label htmlFor="city" className="block text-sm font-medium leading-6 bg-transparent text-white">
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-10 py-1.5 bg-transparent text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={city}
                      onChange={handleInputChange(setCity)}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="region" className="block text-sm font-medium leading-6 bg-transparent text-white">
                    State / Province
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="region"
                      id="region"
                      autoComplete="address-level1"
                      className="block w-full rounded-md border-10 py-1.5 bg-transparent text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={region}
                      onChange={handleInputChange(setRegion)}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="postal-code" className="block text-sm font-medium leading-6 bg-transparent text-white">
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="postal-code"
                      id="postal-code"
                      autoComplete="postal-code"
                      className="block w-full rounded-md border-10 py-1.5 bg-transparent text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={postalCode}
                      onChange={handleInputChange(setPostalCode)}
                    />
                  </div>
                </div>
              </div>
            </div>


          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
           
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
            <button
              onClick={() => navigate('/signin')}            
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
             Sign IN
            </button>

          </div>
        </form>

      </div>
    </div>
  );
};

export default Register;
