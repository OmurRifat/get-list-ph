import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className=' min-h-screen '>
            <h4 className='text-3xl font-bold text-white'>This is Home Component.</h4>
            <Link to='/billings-data'><button className='btn btn-info'>Get Update</button></Link>
        </div>
    );
};

export default Home;