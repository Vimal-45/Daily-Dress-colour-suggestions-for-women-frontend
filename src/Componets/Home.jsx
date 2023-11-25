import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dressImage from '../assets/Suit.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [colors, setColors] = useState('');
    const [colorData, setColorData] = useState([]);
    const [date, setDate] = useState(new Date());
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('TOKEN');
        const email = localStorage.getItem('EMAIL');

        const fetchData = async () => {
            try {
                const headers = {
                    Authorization: token,
                    'Content-Type': 'application/json',
                };

                if (!email) {
                    navigate('/signin');
                } else {
                    const response = await axios.get('https://project-name-backend-4jrk.onrender.com/api/user/getuser', { headers });
                    const data = response.data.colordata;
                    setColorData(data);
                    setColorBasedOnDate(data, new Date());
                }
            } catch (error) {
                console.error('Error making the GET request:', error);
            }
        };

        fetchData();
    }, [navigate]);

    const setColorBasedOnDate = (data, currentDate) => {
        const selectedDate = currentDate.toDateString();
        const matchingColors = data.filter((item) => item.date === selectedDate);

        if (currentDate > new Date()) {
            alert('Please wait for this date to arrive.');
        } else {
            if (matchingColors.length > 0) {
                setColors(matchingColors[0].color);
            } else {
                alert('No color generated for this date');
            }
        }
    };

    const handleColorChange = (event) => {
        setColors(event.target.value);
    };

    return (
        <div className="flex flex-col md:flex-row items-center p-8 h-screen mt-16">
            <div className="w-full md:w-1/2 pl-4 mb-4 md:mb-0">
                
                <div className="calendar-container border rounded shadow-md bg-white">
                    <Calendar
                        onClickDay={(clickedDate) => {
                            setDate(clickedDate);
                            setColorBasedOnDate(colorData, clickedDate);
                        }}
                        value={date}
                        className="rounded p-2 bg-white"
                        tileClassName={({ date, view }) => {
                            if (view === 'month') {
                                const isNow = date.toDateString() === new Date().toDateString();

                                return `
                                ${isNow ? 'bg-purple-200 text-purple-600 font-bold' : ''}
                                ${date.getDay() === 0 || date.getDay() === 6 ? 'text-red-600' : ''}
                                `;
                            }
                            return '';
                        }}
                    />
                </div>
                <p className="text-center mt-4">
                    <span className="font-bold">Selected Date:</span> {date.toDateString()}
                </p>
            </div>
            <h1 className="text-center text-3xl font-bold mb-4">Today Your Colour Is</h1>
                        <div style={{ backgroundColor: `${colors}` }} >
                        <input
                    type="color"
                    className="form-input"
                    value={colors}
                    onChange={handleColorChange}
                /> </div>
            <div className="w-full md:w-1/2 pr-4">
                <div className="product mb-8">
                    <img
                        className='img'
                        src={dressImage}
                        alt="Sample"
                        style={{ backgroundColor: `${colors}` }}
                    />
                    <div className='color' style={{ backgroundColor: `${colors}` }}></div>
                </div>
                {/* <input
                    type="color"
                    className="form-input"
                    value={colors}
                    onChange={handleColorChange}
                />
                <span className="ml-2">Select Your Color</span> */}
            </div>
        </div>
    );
}

export default Home;
