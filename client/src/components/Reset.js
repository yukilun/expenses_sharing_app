import React from 'react'
import { toast, Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { resetPasswordValidate } from '../helper/validate';
import { resetPassword } from '../helper/helper';
import { useAuthStore } from '../store/store';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import useFetch from '../hooks/fetch.hook';
import forgetPasswordSvg from '../assets/forgot_password.svg';

import styles from '../styles/Username.module.css';

export default function Reset() {

    const navigate = useNavigate();
    const { username } = useAuthStore((state) => state.auth);
    const [{ isLoading, serverError }] = useFetch(`createResetSession`);

    const formik = useFormik({
        initialValues: {
            password: '',
            confirm_password: ''
        },
        validate: resetPasswordValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            let resetPromise = resetPassword({ username, password: values.password });
            toast.promise(resetPromise, {
                loading: "Resetting...",
                success: <b>Reset Password Successfully!</b>,
                error: <b>Unable to reset password. Please try again!</b>
            });
            resetPromise.then(() => {
                navigate('/password');
            })
        }
    })

    if (isLoading) return (
        <div className="container mx-auto">
            <Toaster position='top-center' reverseOrder='false'></Toaster>
            <div className="flex justify-center items-center min-h-screen">
                <div className={styles.glass}>
                    <h1 className='text-xl font-bold text-gray-500 text-center py-10'>Loading...</h1>
                    <div className='text-center'><Link to='/'><button className={styles.btn} >Home</button></Link></div>
                </div>
            </div>
        </div>
    );

    if (serverError) return (
        <Navigate to={'/password'} replace={true}></Navigate>
    );

    return (
        <div className="container mx-auto">
            <Toaster position='top-center' reverseOrder='false'></Toaster>
            <div className="flex justify-center items-center min-h-screen max-w-screen">
                <div className='w-full flex flex-row lg:mx-5'>
                    <div className='w-1/2 hidden justify-center items-center lg:flex'>
                        <img src={forgetPasswordSvg} alt='Payment illustration' className='w-[80%]' />
                    </div>
                    <div className={styles.glass}>
                        <div className="title flex flex-col items-center">
                            <h4 className='heading text-2xl font-bold text-center lg:text-4xl'>Reset Password</h4>
                            <span className='py-4 text-m w-2/3 text-center text-gray-500 lg:text-xl'>
                                Enter new password.
                            </span>
                        </div>

                        <form className='py-10' onSubmit={formik.handleSubmit}>
                            <div className="textbox flex flex-col items-center gap-6">
                                <input {...formik.getFieldProps('password')} className={styles.textbox} type="password" placeholder='New Password' />
                                <input {...formik.getFieldProps('confirm_password')} className={styles.textbox} type="password" placeholder='Confirm Password' />
                                <button className={styles.btn} type="submit">Reset</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}
