import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import icon from '../assets/group.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { registerValidate } from '../helper/validate';
import convertToBase64  from '../helper/convert';
import { registerUser } from '../helper/helper';
import joinSvg from '../assets/join.svg';

import styles from '../styles/Username.module.css';

export default function Register() {

    const navigate = useNavigate();
    const [file, setFile] = useState();

    const formik = useFormik({
        initialValues : {
            username: "",
            password: "",
            email: ""
        },
        validate: registerValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            values = await Object.assign(values, {icon: file || ""});
            let registerPromise = registerUser(values);
            toast.promise(registerPromise, {
                loading: 'Creating...',
                success: <b>Registered Successfully!</b>,
                error: <b>Couldn't register! Please try again later.</b>
            });
            registerPromise.then(()=> navigate('/'));
        }
    })

    /** Formik doesn't support file upload so we need to create this handler */
    const onUpload = async e => {
        const base64 = await convertToBase64(e.target.files[0]);
        setFile(base64);
    }

  return (
    <div className="container mx-auto">
        <Toaster position='top-center' reverseOrder='false'></Toaster>
        <div className="flex justify-center items-center min-h-screen max-w-screen">
            <div className='w-full flex flex-row lg:mx-5'>
                <div className='w-1/2 hidden justify-center items-center lg:flex'>
                  <img src={joinSvg} alt='Payment illustration' className='w-[80%]'/>
                </div>
                <div className={styles.glass}>
                    <div className="title flex flex-col items-center">
                        <h4 className='heading text-2xl font-bold text-center lg:text-4xl'>Create Account</h4>
                        <span className='py-4 text-m w-2/3 text-center text-gray-500 lg:text-xl'>
                            Register an account for your group to share expenses!
                        </span>
                    </div>

                    <form className='py-1' onSubmit={formik.handleSubmit}>
                        <div className="profile flex justify-center py-4">
                            <label htmlFor="icon">
                                <img className={styles.icon_img_edit} src={file || icon} alt="icon"/>
                            </label>
                            <input onChange={onUpload} type="file" id="icon" name="icon"/>
                        </div>

                        <div className="textbox flex flex-col items-center gap-5">
                            <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='Username *'/>
                            <input {...formik.getFieldProps('password')} className={styles.textbox} type="password" placeholder='Password *'/>
                            <input {...formik.getFieldProps('email')} className={styles.textbox} type="text" placeholder='Email *'/>
                            <button className={styles.btn} type="submit">Register</button>
                        </div>

                        <div className="text-center py-4">
                            <span className='text-m text-gray-500 lg:text-xl'>Already have an account? &nbsp;<Link className='heading font-bold' to='/'>Login</Link></span>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>
  )
}
