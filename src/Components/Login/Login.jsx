import React, { useState } from 'react'
import Joi from 'joi';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export default function Login({decodeData}) {
    let navigate = useNavigate();
    //Data
    const [user, setUser] = useState({
        email:"",
        password:"",
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
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        })

        let joiResponse = schema.validate(user , {abortEarly: false});
        if(joiResponse.error)
        {
            setErrList( joiResponse.error.details );
        }
        else
        {
            setErrList([]);

            let {data} = await axios.post('https://route-egypt-api.herokuapp.com/signin' , user);
            //console.log(data.message);
            if(data.message != "success")
            {
                setEmailExist(data.message);
            }
            else
            {
                //console.log(data.token);
                setEmailExist('');
                localStorage.setItem('tkn' , data.token);
                decodeData();
                navigate('/home');
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
    <div className="w-75 mx-auto mt-5 pt-5 h-100"> 
        <div className="content">
        <h2 className='fs-3'>Login Form</h2>
        <form onSubmit={ submitForm }>
            <label htmlFor="email"> Email: </label>
            <input onChange={ getUser } type="email" id='email' className='mt-3 form-control' placeholder='email'/>
            <p className='fs-6 text-danger mb-3'>{getError('email')}</p>

            <label htmlFor="password"> Password: </label>
            <input onChange={ getUser } type="password" id='password' className='mt-3 form-control' placeholder='password'/>
            <p className='fs-6 text-danger mb-3'>{getError('password')}</p>

            <button type='submit' className='my-2 btn btn-outline-info'>Log in</button>
            {
                emailExist.length == 0? '': 
                <p className='fs-6 text-danger'>
                    {emailExist}
                </p>
            }
        </form>
        </div>
    </div>
</>
}
