import React from 'react';
import { Link } from 'react-router-dom';
import Login from '../Login';

const Home = () => {
    return (
        <div className=' min-h-screen'>
            <div className=' h-full my-auto'>
                <h4 className='text-3xl font-bold text-white'>This is Home Component.</h4>
                <Link to='/'><button className='btn btn-info'>Get Update</button></Link>
            </div>
        </div>
    );
};

export default Home;