// DressCodeForm.js
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormGroup from 'react-bootstrap/esm/FormGroup';
import FormLabel from 'react-bootstrap/esm/FormLabel';
import FormSelect from 'react-bootstrap/esm/FormSelect';
import Select from 'react-tailwindcss-select';
// import axios from 'axios'
import winter from '../winterDress.json'
import summer from '../summerDres.json'
import fall from '../fallDress.json'
import party from '../partyDress.json'
import wedding from '../weddingDress.json'
import casual from '../casualDress.json'
import office from '../officeDress.json'
import restaurant from '../dinnerDress.json'
import beach from '../beachDress.json'


const DressSuggestions = () => {
    const [dress, setDress] = useState()
    const [collections, setCollections] = useState()
    const seasons = { winter, summer, fall };
    const reasons = { party, wedding, casual };
    const places = { office, restaurant, beach };
    return (
        <> <div className='h-screen mt-16'>
            <h2 className="mt-10 text text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Select Your Collections
            </h2>
            <div className="p-4 flex items-center justify-around">


                {/* <FormLabel className="mb-2">Season:</FormLabel> */}
                <FormSelect
                    value={dress}
                    onChange={(e) => {
                        const selectDress = seasons[e.target.value]
                        setDress(selectDress)
                        setCollections(`${e.target.value} Dress Collections`)
                    }}
                >

                    <option value="">Select a season</option>
                    {Object.keys(seasons).map((s) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
                </FormSelect>


                {/* <FormLabel className="mb-2">Reason:</FormLabel> */}
                <FormSelect
                    value={dress}
                    onChange={(e) => {
                        setDress(reasons[e.target.value])
                        setCollections(`${e.target.value} Dress Collections`)

                    }}
                >
                    <option value="">Select a reason</option>
                    {Object.keys(reasons).map((r) => (
                        <option key={r} value={r}>
                            {r}
                        </option>
                    ))}
                </FormSelect>


                {/* <FormLabel className="mb-2">Place:</FormLabel> */}
                <FormSelect
                    value={dress}
                    onChange={(e) => {
                        setDress(places[e.target.value])
                        setCollections(`${e.target.value} Dress Collections`)
                    }}
                >
                    <option value="">Select a place</option>
                    {Object.keys(places).map((p) => (
                        <option key={p} value={p}>
                            {p}
                        </option>
                    ))}
                </FormSelect>

            </div>


            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                {collections}
            </h2>


            <div className="container-fluid flex flex-wrap justify-center gap-1 p-15">

                {dress && dress.map((item, index) => {
                    console.log(item.Image);
                    return (
                        <>
                            <div key={index} className="max-w-200 p-10 text-center bg-aliceblue">
                                <a href={item.ProductLink} target="_blank" rel="noopener noreferrer">
                                    <img
                                        src={item.Image}
                                        alt={`Product ${index}`}
                                        className="w-full h-auto"
                                        
                                    />
                                </a>
                                <br />
                            </div>


                        </>

                    );

                })}
            </div>

                </div>
        </>
    );
};

export default DressSuggestions;
