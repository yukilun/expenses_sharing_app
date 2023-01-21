import React from 'react'
import { Outlet, NavLink } from 'react-router-dom';

import styles from '../../styles/Home.module.css';

export default function Summary() {
  return (
    <div className={styles.glass + ' px-0 h-[calc(100vh_-_76px)]'}>
      <div className='fixed w-[95%] max-w-[1000px] left-1/2 translate-x-[-50%] lg:translate-x-[calc(-50%_+_145px)]'>

        <div className="title">
          <h4 className='heading py-1 text-xl font-bold text-center lg:text-2xl lg:mt-5'>Summary</h4>
        </div>

        <div className='flex text-base justify-around my-2 text-theme-light-blue shadow-sm lg:text-lg lg:my-5'>
          <NavLink to='' end className={({ isActive }) => 'leading-10 hover:text-theme-blue ' + (isActive && 'text-theme-blue border-b-4 border-theme-blue')}>Share Expenses</NavLink>
          <NavLink to='expenses-analysis' className={({ isActive }) => 'leading-10  hover:text-theme-blue ' + (isActive && 'text-theme-blue border-b-4 border-theme-blue')}>Expenses Analysis</NavLink>
        </div>

      </div>

      <Outlet />
    </div>
  )
}
