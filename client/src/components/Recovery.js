import React, { useEffect, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast';
import { useAuthStore } from '../store/store';
import { generateOTP, verifyOTP } from '../helper/helper';
import { useNavigate } from 'react-router-dom';
import forgetPasswordSvg from '../assets/forgot_password.svg';

import styles from '../styles/Username.module.css';

export default function Recovery() {

    const navigate = useNavigate();
    const {username} = useAuthStore(state => state.auth);
    const [OTP, setOTP] = useState();

    useEffect(()=> {
        let sendPromise = generateOTP(username);
        toast.promise(sendPromise, {
            loading: "Sending email...",
            success: <b>OTP has been send to your email!</b>,
            error: <b>Some issue happened when sending OTP to your email. Please try again later.</b>
        })
    }, [username]);

    const onSubmit = async(e) => {
        e.preventDefault();

        let verifyPromise = verifyOTP({username, code: OTP});
        toast.promise(verifyPromise, {
            loading: "Verifying...",
            success: <b>OTP verified!</b>,
            error: <b>Incorrect OTP. Please check email again!</b>
        });
        verifyPromise.then(()=> {
            navigate('/reset');
        })
    }

    const resendOTP = async() => {
        let sendPromise = generateOTP(username);
        toast.promise(sendPromise, {
            loading: "Sending email...",
            success: <b>OTP has been send to your email!</b>,
            error: <b>Some issue happened when sending OTP to your email. Please try again later.</b>
        })
    };

  return (
    <div className="container mx-auto">
        <Toaster position='top-center' reverseOrder='false'></Toaster>
        <div className="flex justify-center items-center min-h-screen max-w-screen">
            <div className='w-full flex flex-row lg:mx-5'>
                <div className='w-1/2 hidden justify-center items-center lg:flex'>
                  <img src={forgetPasswordSvg} alt='Payment illustration' className='w-[80%]'/>
                </div>
                <div className={styles.glass}>
                    <div className="title flex flex-col items-center">
                        <h4 className='heading text-2xl font-bold text-center lg:text-4xl'>Account Recovery</h4>
                        <span className='py-4 text-m w-2/3 text-center text-gray-500 lg:text-xl'>
                            Enter OTP to reset password.
                        </span>
                    </div>

                    <form className='py-10' onSubmit={onSubmit}>
                        <div className="textbox flex flex-col items-center gap-6">
                            <div className="input text-center">
                            <p className='text-sm text-gray-500 text-left py-4 lg:text-m'>
                                Enter 6 digital OTP sent to your <nobr>email address</nobr>
                            </p>
                            <input onChange={(e)=> setOTP(e.target.value)} className={styles.textbox} type="text" maxLength="6" placeholder='OTP'/>
                            </div>
                            <button className={styles.btn} type="submit">Verify</button>
                        </div>

                        <div className="text-center py-4">
                            <span className='text-m text-gray-500 lg:text-xl'>Didn't receieve OTP? <button className='heading font-bold' onClick={resendOTP} type="button">Resend OTP</button></span>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>
  )
}
