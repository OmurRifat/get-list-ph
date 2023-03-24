import React from 'react';
import { Link } from 'react-router-dom';
import img from '../../assets/medium.jpg'

const Home = () => {
    return (
        <div className=' '>
            <div className=' mt-20 avatar relative'>
                <img src={ img } className='rounded-xl' alt="" />
                <Link to='/'><button className='btn btn-info absolute bottom-10 left-14'>Get Update</button></Link>
            </div>
        </div>
    );
};

export default Home;