import React, { useEffect, useRef } from 'react';
import { useState } from "react"
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"

const ResetPassword = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false);

    const myRef = useRef() 

    useEffect(()=>{
        myRef.current.focus()

    },[])


    const handleSubmit = () => {
        if (!email) { alert('please enter the valid email') }
        else {
            setLoading(true);
            axios.post('https://project-name-backend-4jrk.onrender.com/api/user/forgot-password', { email: email })
                .then(res => {

                    localStorage.setItem('STRING', res.data.randomString);
                    localStorage.setItem('TOKEN', res.data.token);
                    if(!res.data.message){
                        setLoading(false)                        
                    }else{
                        navigate('/signin')
                        alert(res.data.message)                    
                    }
                    // window.close();
                    if(localStorage){

                        setTimeout(() => {            
                            localStorage.clear()           
                          }, 120000 );
            
                    }   



                }).catch(err => {
                    console.log(err)
                    alert("user not found")

                })
        }
        setEmail('')
    }
    return (
<>
  <h1 className="text-center text-3xl font-bold">Forget Password</h1>
  <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md">
    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
      Email
    </label>
    <input
      id="email"
      name="email"
      type="text"
      ref={myRef}
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500 placeholder-gray-400 mb-4"
    />

    <button
      onClick={handleSubmit}
      className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-offset-2 focus:ring-offset-indigo-100 mb-4"
    >
      SEND LINK
    </button>

    {loading && <h1 className="text-center">Link sending ...</h1>}

    <Link
      className="block text-center text-sm text-indigo-600 hover:text-indigo-500"
      to={'/signin'}
    >
      SIGN IN
    </Link>
  </div>
</>

    );
};

export default ResetPassword;