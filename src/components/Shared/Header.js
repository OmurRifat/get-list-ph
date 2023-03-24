import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const Header = () => {
    const { totalAmmount, user, setUser } = useContext(AuthContext)
    const logOut = () => {
        setUser(null);
        localStorage.removeItem("powerHackToken");
    }
    return (
        <div className="navbar justify-between px-24 bg-slate-800 bg-opacity-60 z-10 sticky top-0 backdrop-filter backdrop-blur ">
            <div className="">
                <Link to='/' className="btn btn-info normal-case text-xl z-10">Energy Hack 19</Link>
            </div>
            <div className=" gap-2">
                <div>
                    {
                        user ?
                            <p className=' p-4 bg-white rounded-md text-black font-bold' >Total Paid: { totalAmmount }</p>
                            :
                            <p className=' p-4 bg-white rounded-md text-black font-bold' >Total Paid: 0</p>

                    }
                </div>
                {
                    user && <div>
                        <button onClick={ () => logOut() } className=' p-4 bg-red-500 rounded-md text-white font-bold' ><Link to='/'>Sign Out</Link></button>
                    </div>
                }
                <div className="dropdown dropdown-end">
                    {/* <label tabIndex={ 0 } className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </label> */}
                    <ul tabIndex={ 0 } className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;