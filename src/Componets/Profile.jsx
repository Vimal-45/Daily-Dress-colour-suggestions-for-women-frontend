import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Profile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState([]);
    const [colors, setColors] = useState('');
    const[profileImage, setImage]=useState()

   

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
                    setProfile([response.data])                
                    setColorBasedOnDate(data, new Date());
                    setImage(response.data.profileImgage)
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

        if (matchingColors.length > 0) {
            setColors(matchingColors[0].color);

        }
    };

    return (
        <>
            <div className="h-screen mt-16" >
                <div
                    className="profilediv bg-gray-200 p-10"
                >
                    {profile.map((item, index) => (
                        <div
                            key={index}
                        // className="bg-teal-300 m-2 p-2 w-64 h-15 rounded-md shadow-md"
                        >
                            <div class="container">
                                <div class="main-body">
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <div class="card">
                                                <div class="card-body">
                                                    <div class="d-flex flex-column align-items-center text-center">
                                                        <img 
                                                        // src="https://bootdey.com/img/Content/avatar/avatar6.png" 
                                                        src={profileImage}

                                                        alt="Admin" class="rounded-circle p-1 bg-primary" width="110" />
                                                        <div class="mt-3">
                                                            <h4> {item.firstName} {item.lastName} </h4>

                                                            <h6 class="text-muted font-size-sm"> Bay Area {item.city} {item.region} </h6>


                                                        </div>
                                                    </div>
                                                    <hr class="my-4" />

                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-8">
                                            <div class="card">
                                                <div class="card-body">
                                                    <div class="row mb-3">
                                                        <div class="col-sm-3">
                                                            <h6 class="mb-0">Full Name:</h6>
                                                        </div>
                                                        <div class="col-sm-9 text-secondary">
                                                            <h6> {item.firstName} {item.lastName} </h6>
                                                        </div>
                                                    </div>
                                                    <div class="row mb-3">
                                                        <div class="col-sm-3">
                                                            <h6 class="mb-0">Email:</h6>
                                                        </div>
                                                        <div class="col-sm-9 text-secondary">
                                                            <h6> {item.email} </h6>
                                                        </div>
                                                    </div>
                                                    <div class="row mb-3">
                                                        <div class="col-sm-3">
                                                            <h6 class="mb-0">User Name:</h6>
                                                        </div>
                                                        <div class="col-sm-9 text-secondary">
                                                            <h6> {item.username} </h6>
                                                        </div>
                                                    </div>
                                                    <div class="row mb-3">
                                                        <div class="col-sm-3">
                                                            <h6 class="mb-0">Country:</h6>
                                                        </div>
                                                        <div class="col-sm-9 text-secondary">
                                                            <h6> {item.Country} </h6>
                                                        </div>
                                                    </div>
                                                    <div class="row mb-3">
                                                        <div class="col-sm-3">
                                                            <h6 class="mb-0">Address:</h6>
                                                        </div>
                                                        <div class="col-sm-9 text-secondary">
                                                            <h6> {item.Address} {item.city} </h6>
                                                        </div>
                                                    </div>
                                                    <div class="row mb-3">
                                                        <div class="col-sm-3">
                                                            <h6 class="mb-0">State:</h6>
                                                        </div>
                                                        <div class="col-sm-9 text-secondary">
                                                            <h6> {item.region} - {item.postalCode} </h6>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-sm-3"></div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <div class="card">
                                                        <div class="card-body" style={{ backgroundColor: `${colors}` }} >
                                                            <div class="d-flex flex-column align-items-center text-center"  >
                                                                <h4> Today Color</h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>


                <Outlet />
            </div>
        </>
    );
};

export default Profile;
