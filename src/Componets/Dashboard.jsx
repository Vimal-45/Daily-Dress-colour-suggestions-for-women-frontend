import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const navigate = useNavigate();
    const [color, setColor] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('TOKEN');
        const email = localStorage.getItem('EMAIL');

        console.log(token);
        const headers = {
            Authorization: token,
            'Content-Type': 'application/json',
        };

        if (!email) {
            navigate('/signin');
        } else {
            axios
                .get('https://project-name-backend-4jrk.onrender.com/api/user/getuser', { headers: headers })
                .then((res) => {
                    console.log('Response:', res.data.colordata);
                    setColor(res.data.colordata);
                })
                .catch((error) => {
                    console.error('Error making the GET request:', error);
                });
        }
    }, []); 

    useEffect(() => {
       
        const intervalId = setInterval(() => {
            axios.get('https://project-name-backend-4jrk.onrender.com/api/user/getuser', {
                    headers: {
                        Authorization: localStorage.getItem('TOKEN'),
                        'Content-Type': 'application/json',
                    },
                })
                .then((res) => {
                    // console.log('Response:', res.data.colordata);
                    setColor(res.data.colordata);
                })
                .catch((error) => {
                    console.error('Error making the GET request:', error);
                });
        }, 10000); // 1hr 1 * 60 * 60 * 1000

        
        return () => clearInterval(intervalId);
    }, []); 

    return (
        <>
            <div className="h-screen mt-16 p-12" >
                <div className="flex homediv justify-start bg-gray-200 flex-wrap p-10">
                    {color.map((item, index) => (
                        <div
                            key={index}
                            className="bg-teal-300 m-2 p-2 w-64 h-15 rounded-md shadow-md"
                            style={{ background: `${item.color}` }}
                        >
                            <h5>Your Dress Color on {item.date}</h5>
                        </div>
                    ))}
                </div>
                <Outlet />
            </div>
        </>
    );
};

export default Dashboard;
