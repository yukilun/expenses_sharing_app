import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import icon from '../assets/group.png';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate } from '../helper/validate';
import { useAuthStore } from '../store/store';

import styles from '../styles/Username.module.css';

export default function Username() {

    const navigate = useNavigate();
    const setUsername = useAuthStore(state=>state.setUsername);

    const formik = useFormik({
        initialValues : {
            username: ''
        },
        validate: usernameValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            setUsername(values.username);
            navigate('/password');
        }
    })

  return (
    <div className="container mx-auto">
        <Toaster position='top-center' reverseOrder='false'></Toaster>
        <div className="flex justify-center items-center min-h-screen">
            <div className={styles.glass}>
                <div className="title flex flex-col items-center">
                    <h4 className='logo heading py-1 text-3xl font-bold text-center lg:text-5xl'>Expenses Sharing</h4>
                    <span className='py-4 text-m w-2/3 text-center text-gray-500 lg:text-xl'>
                        Record and Share expenses easily.
                    </span>
                </div>

                <form className='py-1' onSubmit={formik.handleSubmit}>
                    <div className="profile flex justify-center py-4">
                        {/* <img className={styles.icon_img} src={icon} alt="icon"/> */}
                        <div className='icon_img logo heading font-extrabold text-7xl'>%</div>
                        
                    </div>

                    <div className="textbox flex flex-col items-center gap-6">
                        <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='Username'/>
                        <button className={styles.btn} type="submit">Next</button>
                    </div>

                    <div className="text-center py-4">
                        <span className='text-m text-gray-500 lg:text-xl'>Don't have an account? &nbsp;<Link className='heading font-bold' to='/register'>Register Now</Link></span>
                    </div>
                </form>

            </div>
        </div>
    </div>
  )
}
