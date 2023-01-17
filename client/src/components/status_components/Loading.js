import React from 'react'
import { Toaster } from 'react-hot-toast';
import styles from '../../styles/Username.module.css';

export default function Loading() {
  return (
    <div className="container mx-auto">
    <Toaster position='top-center' reverseOrder='false'></Toaster>
    <div className={styles.container}>
        <div className='heading text-3xl'>Loading...</div>
    </div>
</div>
  )
}
