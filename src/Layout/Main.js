import React from 'react';
import { Outlet } from 'react-router-dom';
import Home from '../components/Home/Home';
import Footer from '../components/Shared/Footer';
import Header from '../components/Shared/Header';

const Main = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;