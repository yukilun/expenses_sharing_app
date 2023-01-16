import React from 'react'
import styles from '../styles/Username.module.css';
import { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import pageNotFoundSvg from '../assets/page_not_found.svg';

export default function PageNotFound() {
  return (
    <div className="container mx-auto">
      <Toaster position='top-center' reverseOrder='false'></Toaster>
      <div className="flex justify-center items-center min-h-screen">
        <div className={styles.glass}>
          <img src={pageNotFoundSvg} alt="404 Page Not Found" className='block mx-auto max-w-[300px] w-[90%]' />
          <h1 className='text-xl text-center py-10'>Page Not Found!</h1>
          <div className='text-center'><Link to='/'><button className={styles.btn} >Home</button></Link></div>
        </div>
      </div>
    </div>
  )
}
