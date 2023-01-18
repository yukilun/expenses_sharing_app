import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import Animation from '../middleware/Animation';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import icon from '../assets/group.png';
import { FaBars, FaPlus, FaDollarSign, FaListUl } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import useFetch from '../hooks/fetch.hook';

import styles from '../styles/Home.module.css';
export default function Home() {

    const navigate = useNavigate();
    const [{ isLoading, apiData, serverError }] = useFetch();
    const [isOpenNav, setOpenNav] = useState(false);

    const navLinks = [
        {
            title: 'Summary',
            path: '',
            icon: <FaDollarSign />
        },
        {
            title: 'Add Expense',
            path: 'add-expense',
            icon: <FaPlus />
        },
        {
            title: 'Expense Records',
            path: 'expenses',
            icon: <FaListUl />
        },
        {
            title: 'Members',
            path: 'members',
            icon: <HiUserGroup />
        }
    ];

    if (isLoading) {
        return (
            <div>
                Loading...
            </div>
        );
    }

    if (serverError) {
        return (
            <div>
                Error
            </div>
        )
    }



    return (
        <Animation className="container mx-auto">
            <Toaster position='top-center' reverseOrder='false'></Toaster>
            <div className={styles.container}>
                <div className={styles.nav}>

                    <div className='topbar relative'>

                        <div className='w-full '>
                            <h4 className='logo heading text-xl font-bold text-center'>
                                <span className='logo text-3xl'>%</span>
                                <span>&nbsp; </span>
                                <nobr>Expenses Sharing</nobr>
                            </h4>
                        </div>

                        <div className='icon absolute top-1/2 right-0 translate-y-[-50%] lg:translate-y-0 lg:relative lg:flex lg:flex-col lg:justify-center lg:items-center lg:my-5'>
                            <img src={apiData?.icon || icon} alt="icon" className='border-gray-100 object-cover rounded-full shadow-lg 
                                                    cursor-pointer w-[40px] h-[40px] lg:w-[120px] lg:h-[120px] lg:border-4 hover:border-gray-200'
                                onClick={() => navigate('./profile')} />
                        </div>

                        <FaBars onClick={() => setOpenNav(true)}
                            className='text-2xl text-theme-blue absolute top-1/2 left-0 translate-y-[-50%] transition-transform cursor-pointer hover:rotate-180 lg:hidden' />

                    </div>

                    <nav className={'fixed top-0 left-0 z-10 h-screen w-full bg-black bg-opacity-30 ' 
                                    + 'lg:relative lg:h-fit lg:w-full lg:bg-transparent lg:pt-1 ' + (isOpenNav ? 'visible' : 'invisible lg:visible')}>

                        <ul className={'absolute top-0 left-0 w-[70%] min-w-fit h-full shadow-lg bg-white bg-opacity-90 rounded-r-xl text-lg transition-all duration-500' + 
                                        ' lg:relative lg:bg-transparent lg:shadow-none lg:w-full ' + (isOpenNav ? 'translate-x-0' : 'translate-x-[-100%] lg:translate-x-0')}>
                            
                            <li className='text-4xl text-theme-blue p-4 my-2 lg:hidden'>
                                <a className='flex justify-end'>
                                    <IoClose onClick={() => setOpenNav(false)}
                                        className='transition-transform hover:rotate-180' />
                                </a>
                            </li>

                            {navLinks.map((link, index) =>
                                <li key={index} className="even:text-theme-plum odd:text-theme-blue">
                                    <NavLink to={link.path} end onClick={()=> setOpenNav(false)}
                                        className={({ isActive }) => 'flex gap-5 items-center p-3 my-3 mx-2 lg:bg-white lg:rounded-lg ' + (isActive ? 'border-r-8 border-r-slate-400 lg:border-0 lg:shadow-md' : 'opacity-60')}>
                                        {link.icon} <span>{link.title}</span>
                                    </NavLink>
                                </li>
                            )}

                            <li className="text-gray-500">
                                <a  onClick={()=> {
                                        localStorage.removeItem('token');
                                        navigate('/');
                                     }}
                                    className= 'flex gap-5 items-center p-4 my-5 mx-2'>
                                    <BiLogOut/> <span>Logout</span>
                                </a>
                            </li>

                        </ul>
                    </nav>

                </div>
                <Outlet context={[apiData]}/>
            </div>
        </Animation>
    )
}
