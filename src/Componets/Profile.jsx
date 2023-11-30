import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import country from '../country.json';
// import country from '../country.json';



const Profile = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [profileImage, setImageUrl] = useState('');
    const [imageProfile, setImage] = useState()
    const [profile, setProfile] = useState([]);
    const [colors, setColors] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [region, setRegion] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);



    useEffect(() => {

        fetchData();
    }, [navigate]);

    const fetchData = async () => {
        const token = localStorage.getItem('TOKEN');
        const email = localStorage.getItem('EMAIL');
        try {
            const headers = {
                Authorization: token,
                'Content-Type': 'application/json',
            };

            if (!email) {
                navigate('/signin');
            } else {
                const response = await axios.get('https://project-name-backend-4jrk.onrender.com/api/user/getuser', { headers });
                const userData = response.data;

                setUsername(userData.username);
                setFirstName(userData.firstName);
                setLastName(userData.lastName);
                setEmail(userData.email);
                setSelectedCountry(userData.Country);
                setStreetAddress(userData.Address);
                setCity(userData.city);
                setRegion(userData.region);
                setPostalCode(userData.postalCode);
                const data = response.data.colordata;
                setProfile([response.data]);
                setColorBasedOnDate(data, new Date());
                setImage(userData.profileImage);
                setImageUrl(userData.profileImage)

            }
        } catch (error) {
            console.error('Error making the GET request:', error);
        }
    };


    const setColorBasedOnDate = (data, currentDate) => {
        const selectedDate = currentDate.toDateString();
        const matchingColors = data.filter((item) => item.date === selectedDate);

        if (matchingColors.length > 0) {
            setColors(matchingColors[0].color);

        }
    };


    const handleInputChange = (setState) => (e) => {
        setState(e.target.value);
    };

    const handleFileChange = (event) => {
        const uploadedfile = event.target.files[0];
        setFile(uploadedfile);

        if (uploadedfile) {
            setLoading(true)
            const data = new FormData();
            data.append('file', uploadedfile); // Use uploadedfile, not file
            data.append('upload_preset', 'stvzpsmo');
            data.append('cloud_name', 'dwo49uopx');

            axios.post('https://api.cloudinary.com/v1_1/dwo49uopx/image/upload', data)
                .then(response => {
                    // console.log(response.data.secure_url);
                    setImageUrl(response.data.secure_url);
                    setImage(response.data.secure_url);
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
        axios.post('https://project-name-backend-4jrk.onrender.com/api/user/update', {
            Update: 'Update',
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email,
            Country: selectedCountry,
            Address: streetAddress,
            city: city,
            region: region,
            postalCode: postalCode,
            profileImage: profileImage
        })
            .then(res => {
                alert(res.data.message)
                setLoading(false)
                if (res.data.message.length > 0) {

                    navigate('/profile')
                    window.location.reload()
                }

            }).catch(err => {
                console.log(err);

            })

        fetchData();


    };

    return (
        <>
            <div className="h-screen mt-16">
                <div className="profilediv bg-gray-200 p-10">

                    <form onSubmit={handleSubmit}>

                        {profile.map((item, index) => (

                            <div key={index}>
                                <div className="container">
                                    <div className="main-body">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="d-flex flex-column align-items-center text-center">
                                                            <img
                                                                src={imageProfile}
                                                                alt="Admin"
                                                                className="rounded-circle p-1 bg-primary"
                                                                width="110"
                                                            />
                                                            <div className="mt-3">
                                                                <h4>{item.firstName} {item.lastName}</h4>
                                                                <h6 className="text-muted font-size-sm">
                                                                    Bay Area {streetAddress} {item.city} {item.region}
                                                                </h6>
                                                            </div>
                                                        </div>

                                                        <hr className="my-4" />

                                                    </div>

                                                </div>
                                            </div>
                                            <div className="col-lg-8">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="row mb-3">
                                                            <div className="col-sm-3">
                                                                <label className="mb-0">Full Name:</label>
                                                            </div>
                                                            <div className="col-sm-9 text-secondary">
                                                                <input
                                                                    type="text"
                                                                    className="block w-full mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                                                    placeholder={item.firstName}
                                                                    value={firstName}
                                                                    onChange={handleInputChange(setFirstName)}
                                                                />
                                                                <input
                                                                    type="text"
                                                                    className="block w-full mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                                                    placeholder={item.lastName}
                                                                    value={lastName}
                                                                    onChange={handleInputChange(setLastName)}

                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <div className="col-sm-3">
                                                                <label className="mb-0">Email:</label>
                                                            </div>
                                                            <div className="col-sm-9 text-secondary">
                                                                <input
                                                                    type="text"
                                                                    className="block w-full mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                                                    placeholder={item.email}
                                                                    value={email}
                                                                    onChange={handleInputChange(setEmail)}
                                                                    readOnly
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <div className="col-sm-3">
                                                                <label className="mb-0">User Name:</label>
                                                            </div>
                                                            <div className="col-sm-9 text-secondary">
                                                                <input
                                                                    type="text"
                                                                    className="block w-full mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                                                    placeholder={item.username}
                                                                    value={username}
                                                                    onChange={handleInputChange(setUsername)}
                                                                />

                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <div className="col-sm-3">
                                                                <label className="mb-0">Country:</label>
                                                            </div>
                                                            <div className="col-sm-9 text-secondary">
                                                                <select
                                                                    id="country"
                                                                    name="country"
                                                                    autoComplete="country-name"
                                                                    value={selectedCountry}
                                                                    onChange={handleInputChange(setSelectedCountry)}
                                                                    className="block w-full mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
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
                                                        <div className="row mb-3">
                                                            <div className="col-sm-3">
                                                                <label className="mb-0">Full Address:</label>
                                                            </div>
                                                            <div className="col-sm-9 text-secondary">
                                                                <input
                                                                    type="text"
                                                                    className="block w-full mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                                                    placeholder={item.Address}
                                                                    value={streetAddress}
                                                                    onChange={handleInputChange(setStreetAddress)}

                                                                />
                                                                <input
                                                                    type="text"
                                                                    className="block w-full mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                                                    placeholder={item.city}
                                                                    value={city}
                                                                    onChange={handleInputChange(setCity)}

                                                                />

                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <div className="col-sm-3">
                                                                <label className="mb-0">State:</label>
                                                            </div>
                                                            <div className="col-sm-9 text-secondary">
                                                                <input
                                                                    type="text"
                                                                    className="block w-full mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                                                    placeholder={item.region}
                                                                    value={region}
                                                                    onChange={handleInputChange(setRegion)}
                                                                    readOnly
                                                                />
                                                                <input
                                                                    type="text"
                                                                    className="block w-full mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                                                    placeholder={item.postalCode}
                                                                    value={postalCode}
                                                                    onChange={handleInputChange(setPostalCode)}
                                                                    readOnly
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="mt-4 flex justify-between text-sm leading-6 text-gray-500">
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
                                                                    onChange={handleFileChange}
                                                                />
                                                            </label>


                                                            <p className="pl-1"> {file ? file.name : 'Update Your Photo'} </p>
                                                            <button
                                                                type="submit"
                                                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
                                                                    'Update Your Profile'
                                                                )}
                                                            </button>


                                                        </div>

                                                        <div className="row">
                                                            <div className="col-sm-3"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="card">
                                                            <div
                                                                className="card-body"
                                                                style={{ backgroundColor: `${colors}` }}
                                                            >
                                                                <div className="d-flex flex-column align-items-center text-center">
                                                                    <h4>Today Color</h4>
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

                        <button>


                        </button>

                    </form>
                </div>
                <Outlet />
            </div>;

        </>
    );
};

export default Profile;

