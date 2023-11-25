import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

const SetNewPassword = () => {
    const navigate = useNavigate();
    const [mailString] = useSearchParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConPassword] = useState('');
    const localString = localStorage.getItem('STRING');
    const myRef = useRef();

    useEffect(() => {
        if (mailString.get('string') !== localString) {
            alert('The Password Reset Link has Expired');
            navigate('/forget-pass');
        }

        setTimeout(() => {
            localStorage.clear('STRING');
        }, 120000);

        myRef.current.focus();
    }, []);

    const handleSubmit = () => {
        if (!localString) {
            alert('The Password Reset Link has Expired');
            navigate('/forget-pass');
        } else {
            if (password !== confirmPassword) {
                alert('Password does not match');
            } else if (password.length < 5) {
                alert('Password should have a minimum of FIVE characters');
            } else {
                axios
                    .post('https://project-name-backend-4jrk.onrender.com/api/user/reset-password', {
                        string: localString,
                        password: confirmPassword,
                    })
                    .then((res) => {
                        if (res.data.message === 'password updated sucessfully') {
                            navigate('/signin');
                            alert('Password Updated.');
                        } else {
                            alert('Server error / password updated failed');
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });

                setConPassword('');
                setPassword('');
            }
        }
    };

    return (
        <div className="mx-auto max-w-md mt-8 p-4">
            <h1 className="text-center text-3xl font-bold">RESET PASSWORD</h1>
            <div className="bg-white p-4 rounded-md shadow-md">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    New Password
                </label>
                <input
                    ref={myRef}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500 mb-4"
                    type="password"
                />

                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                </label>
                <input
                    value={confirmPassword}
                    onChange={(e) => setConPassword(e.target.value)}
                    className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500 mb-4"
                    type="password"
                />

                <button
                    onClick={handleSubmit}
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-offset-2 focus:ring-offset-indigo-100 mb-4"
                >
                    CHANGE PASSWORD
                </button>

                <h6 className="text-orange-500">Password needs minimum of <b>FIVE</b> letters or numbers</h6>
            </div>
        </div>
    );
};

export default SetNewPassword;
