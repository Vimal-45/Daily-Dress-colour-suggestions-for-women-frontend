import React, { useEffect, useRef, useState } from 'react';
import { PersonCircle } from 'react-bootstrap-icons';
// import country from '../country.json';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';



const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setImageUrl] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const myRef = useRef()
  
  useEffect(() => {
    myRef.current.focus()

  }, [])



  const handleFileChange = (event) => {
    const uploadedfile = event.target.files[0];
    setFile(uploadedfile);

    if (uploadedfile) {
      setLoading(true)
      const data = new FormData();
      data.append('file', uploadedfile);
      data.append('upload_preset', 'stvzpsmo');
      data.append('cloud_name', 'dwo49uopx');

      axios.post('https://api.cloudinary.com/v1_1/dwo49uopx/image/upload', data)
        .then(response => {
          // console.log(response.data.secure_url);

          setImageUrl(response.data.secure_url)
          setLoading(false)


        })
        .catch(error => {
          console.error(error);
        });
    }
  };



  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault();
    console.log(username, password, email, profileImage);
    if (password.length < 5) {
      alert("password shold minimum 5 charactor")
      setLoading(false)
      return;
    }

    if (!username || !password || !email) {
      alert('Please fill in all required fields.');
      setLoading(false)
      return;
    }
    // axios.post('https://project-name-backend-4jrk.onrender.com/api/user/register', {
    axios.post('http://localhost:4000/api/user/register', {
      username: username,
      email: email,
      password: password,
      profileImage: profileImage
    })
      .then(res => {

        if (res.data.message === 'User with this email already exists' ) {        
          alert(res.data.message)         
          setLoading(false)

        } else{
          alert(res.data.message)
          navigate('/signin')
          setLoading(false)
        }

      }).catch(err => {
        console.log(err);

      })

    setUsername('')
    setFile(null)
    setEmail('')
    setPassword('')

  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {profileImage ? (
          <img
            style={{ height: 120, borderRadius: '50%' }}
            className="mx-auto w-auto"
            src={profileImage}
            alt="Your Company"
          />

        ) : (
          <PersonCircle className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />


        )}

        <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register to your account
        </h2>
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              User Name
            </label>
            <div className="mt-1">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                ref={myRef}
                required
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className="block w-full rounded-md py-1 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6 text-center"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              E-mail
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"

                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="block w-full rounded-md py-1 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6 text-center"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="text"
                autoComplete="password"

                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="block w-full rounded-md py-1 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6 text-center"
              />
            </div>
          </div>



          <div className="mt-2 flex items-center text-sm leading-6 text-gray-500">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span>Upload Your Photo <span style={{ color: 'gray' }} >{file ? file.name : 'No file selected'} { } </span> </span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                onChange={handleFileChange}
                disabled={loading}


              />
            </label>

          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              disabled={loading}
            >
              {loading ? (
                <div aria-label="Loading..." role="status" className="flex items-center space-x-2">
                  <svg className="h-20 w-20 animate-spin stroke-gray-500 text-gray-500" viewBox="0 0 256 256">
                    <line x1="128" y1="32" x2="128" y2="64" strokeWidth="round" strokeLinejoin="round" stroke-width="24"></line>
                    <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" strokeWidth="round" strokeLinejoin="round" stroke-width="24"></line>
                    <line x1="224" y1="128" x2="192" y2="128" strokeWidth="round" strokeLinejoin="round" stroke-width="24"></line>
                    <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" strokeWidth="round" strokeLinejoin="round" stroke-width="24"></line>
                    <line x1="128" y1="224" x2="128" y2="192" strokeWidth="round" strokeLinejoin="round" stroke-width="24"></line>
                    <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" strokeWidth="round" strokeLinejoin="round" stroke-width="24"></line>
                    <line x1="32" y1="128" x2="64" y2="128" strokeWidth="round" strokeLinejoin="round" stroke-width="24"></line>
                    <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" strokeWidth="round" strokeLinejoin="round" stroke-width="24"></line>
                  </svg>
                  <span className="text-4xl font-medium text-gray-500">Loading...</span>
                </div>
              ) : (
                'Create Account'
              )}

            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          <Link style={{ textAlign: 'center', display: 'block', marginTop: '5px' }} to={'/signin'}>
            SIGN IN
          </Link>
        </p>
      </div>
    </div>

  );
};

export default Register;




