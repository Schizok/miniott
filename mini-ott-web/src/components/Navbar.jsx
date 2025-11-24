import React from 'react';
import { Link } from 'react-router-dom';
import { User, Search, Bell } from 'lucide-react';

const Navbar = () => {
    return (
        <div className="navbar bg-base-100/80 backdrop-blur-md fixed top-0 z-50 border-b border-white/10">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-2xl font-bold text-primary gap-2">
                    <div className="w-8 h-8 rounded bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-black font-bold">
                        M
                    </div>
                    MiniOTT
                </Link>
            </div>
            <div className="flex-none gap-4">
                <div className="form-control hidden sm:block">
                    <div className="relative">
                        <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto pl-10 h-10 bg-base-200 focus:bg-base-100 transition-colors" />
                        <Search className="w-4 h-4 absolute left-3 top-3 text-base-content/50" />
                    </div>
                </div>
                <button className="btn btn-ghost btn-circle">
                    <Bell className="w-5 h-5" />
                </button>
                <div className="dropdown dropdown-end">
                    <div tabindex="0" role="button" className="btn btn-ghost btn-circle avatar placeholder">
                        <div className="bg-neutral text-neutral-content rounded-full w-10">
                            <span className="text-xs"><User /></span>
                        </div>
                    </div>
                    <ul tabindex="0" className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li><a>Profile</a></li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
