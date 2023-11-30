import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/Logo.jpeg';


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const myRef = useRef();

    useEffect(() => {
        myRef.current.focus();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        // console.log(email, password);
        axios.post('https://project-name-backend-4jrk.onrender.com/api/user/login', { email: email, password: password })
            .then((res) => {
                if (!res.data.email) {
                    alert(res.data.message);
                    setLoading(false)
                } else {
                    const token = res.data.token;
                    localStorage.setItem('EMAIL', email);
                    localStorage.setItem('TOKEN', token);
                    navigate('/nav')
                    navigate('/home');
                }
            })
            .catch((err) => {
                console.log(err);
            });
        setEmail('');
        setPassword('');
    };
    const imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzcEUiWZF3LDOE2zvnZiRttAkShp1SSiGIBOOIX0qkwz6QksmyW2kCQ4gB0zSC4nW9Ly8&usqp=CAU"

    return (


        <div style={{ backgroundImage: `url(${imageUrl})` }} className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img style={{ height: 120 }}
                    className="mx-auto  w-auto"
                    // src="https://i.pinimg.com/originals/cb/ac/d4/cbacd4816617e88cc7b9528d841b6084.png"
                    src={Logo}
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                ref={myRef}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                className="block w-full rounded-md py-1.5 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6 text-center"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                className="block w-full rounded-md py-1.5 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6 text-center"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            disabled={loading}                        
                            >
                                    {loading ? (
                                <div aria-label="Loading..." role="status" className="flex items-center space-x-2">
                                    <svg className="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
                                    <line x1="128" y1="32" x2="128" y2="64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                                    <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                                    <line x1="224" y1="128" x2="192" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                                    <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                                    <line x1="128" y1="224" x2="128" y2="192" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                                    <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                                    <line x1="32" y1="128" x2="64" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                                    <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                                    </svg>

                                    <span className="text-4xl font-medium text-gray-500">Loading...</span>
                                </div>
                            ) : (
                                'Sign in'
                            )}
                        
                        </button>
                    </div>
                </form>



                <p className="mt-10 text-center text-sm text-gray-500">
                    <Link className="font-semibold text-indigo-600 hover:text-indigo-500 text-center" to={'/forget-pass'}>
                        Forget Password
                    </Link> {' '}

                    Not a member?
                    <Link style={{ textAlign: 'center', display: 'block', marginTop: '5px' }} to={'/signup'}>
                        SIGN UP
                    </Link>
                </p>
            </div>
        </div>
   
    );
};

export default Login;
