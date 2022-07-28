import React, { useState } from 'react'
import Joi from 'joi';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export default function Signup() {
let navigate = useNavigate();
    //Data
    const [user, setUser] = useState({
        first_name:"",
        last_name:"",
        email:"",
        password:"",
        age:"",
    });
    const [errList, setErrList] = useState([]);
    const [emailExist, setEmailExist] = useState('');

    //Functions
    function getUser(e)
    {
        let inputValue = e.target.value;
        let newUser = {...user};
        newUser[e.target.id] = inputValue;
        setUser(newUser);
    }

    async function submitForm(e)
    {
        e.preventDefault();
        
        const schema = Joi.object({
            first_name: Joi.string().min(3).max(10).alphanum().required(),
            last_name: Joi.string().min(3).max(10).alphanum().required(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            age: Joi.number().required().min(12).max(80)
        })

        let joiResponse = schema.validate(user , {abortEarly: false});
        if(joiResponse.error)
        {
            setErrList( joiResponse.error.details );
        }
        else
        {
            setErrList([]);

            let {data} = await axios.post('https://route-egypt-api.herokuapp.com/signup' , user);
            if(data.errors)
            {
                setEmailExist(data.message);
            }
            else
            {
                setEmailExist('');
                navigate('/login');
            }
        }
    }

    function getError(key)
    {
        for (const error of errList) {
            if(error.context.key == key)
            {
                return error.message;
            }
        }
        return '';
    }
return <>
    <div className="w-75 mx-auto mt-5">
        <h2 className='fs-3'>Registration Form</h2>
        <form onSubmit={ submitForm }>
            <label htmlFor="first_name"> firstName: </label>
            <input onChange={ getUser } type="text" id='first_name' className='mt-3 form-control' placeholder='firstName'/>
            <p className=' fs-6 text-danger mb-3'> {getError('first_name')}</p>

            <label htmlFor="last_name"> lastName: </label>
            <input onChange={ getUser } type="text" id='last_name' className='mt-3 form-control' placeholder='lastName'/>
            <p className=' fs-6 text-danger mb-3'> {getError('last_name')}</p>

            <label htmlFor="age"> Age: </label>
            <input onChange={ getUser } type="number" id='age' className='mt-3 form-control' placeholder='age'/>
            <p className=' fs-6 text-danger mb-3'> {getError('age')}</p>

            <label htmlFor="email"> Email: </label>
            <input onChange={ getUser } type="email" id='email' className='mt-3 form-control' placeholder='email'/>
            <p className=' fs-6 text-danger mb-3'> {getError('email')}</p>

            <label htmlFor="password"> Password: </label>
            <input onChange={ getUser } type="text" id='password' className='mt-3 form-control' placeholder='password'/>
            <p className=' fs-6 text-danger mb-3'> {getError('password')}</p>

            <button type='submit' className='my-2 btn btn-outline-info'>Register</button>
            {
                emailExist.length == 0? '': 
                <p className='fs-6 text-danger'>
                    {emailExist}
                </p>
            }
        </form>
    </div>
</>
}
