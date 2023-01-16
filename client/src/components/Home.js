import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

import styles from '../styles/Username.module.css';
import { Outlet } from 'react-router-dom';

export default function Home() {

    return (
        <div className="container mx-auto">
            <Toaster position='top-center' reverseOrder='false'></Toaster>
            <div className="flex justify-center items-center min-h-screen max-w-screen">
                <div className='w-full flex flex-row lg:mx-5'>
                    <div className={styles.glass}>
                        <div className="title flex flex-col items-center">
                            <h4 className='heading text-2xl font-bold text-center lg:text-4xl'>Account Details</h4>
                            <span className='py-4 text-m w-2/3 text-center text-gray-500 lg:text-xl'>
                                You can update the account detail
                            </span>
                            <Outlet/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
