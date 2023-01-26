import React from 'react'
import { Outlet, NavLink, useOutletContext, useNavigate } from 'react-router-dom';

import styles from '../../styles/Home.module.css';

export default function Summary() {

  const navigate = useNavigate();
  const [apiData] = useOutletContext();

  return (
    <div className={styles.glass + ' px-0 h-full'}>

      {/* Popup Window for No Member Case */}
      {apiData?.members.length === 0 &&
        <div className='add-edit-member-bg bg-black bg-opacity-30 w-screen h-screen fixed z-30 top-0 left-0'>
          <div className={'add-edit-member-popup bg-white w-[90%] rounded-xl shadow-lg flex flex-col items-center py-10 gap-10 '
            + 'sm:w-[400px] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] lg:translate-x-[calc(-50%_+_145px)]'}
          >
            <h6 className='heading font-bold text-lg'>Welcome!</h6>
            <p className='text-base text-gray-600 max-w-[200px] text-center ' >
              To get started, add members to this group account.
            </p>
            <p className='text-base text-gray-600 max-w-[200px] text-center ' >
              Then, add expenses so that we can help you all sharing expenses!
            </p>
            <button
              className="bg-theme-light-blue text-white text-base text-center w-full max-w-[250px] border py-3 rounded-lg shadow-md mx-auto mb-3 lg:text-lg hover:bg-theme-blue"
              onClick={() => navigate('members')}
            >
              Navigate to Members Page
            </button>
          </div>
        </div>
      }

      <div className='fixed z-20 w-[95%] max-w-[1000px] left-1/2 translate-x-[-50%] lg:translate-x-[calc(-50%_+_145px)]'>

        <div className="title">
          <h4 className='heading py-1 text-xl font-bold text-center lg:text-2xl lg:mt-5'>Summary</h4>
        </div>

        <div className='flex text-base justify-around my-2 text-theme-light-blue shadow-sm lg:text-lg lg:my-5'>
          <NavLink to='' end className={({ isActive }) => 'leading-10 hover:text-theme-blue ' + (isActive && 'text-theme-blue border-b-4 border-theme-blue')}>Share Expenses</NavLink>
          <NavLink to='expenses-analysis' className={({ isActive }) => 'leading-10  hover:text-theme-blue ' + (isActive && 'text-theme-blue border-b-4 border-theme-blue')}>Expenses Analysis</NavLink>
        </div>

      </div>

      <Outlet context={[apiData]} />
      
    </div>
  )
}
