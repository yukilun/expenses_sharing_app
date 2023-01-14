import React, {useState} from 'react'
import { Link , useNavigate } from 'react-router-dom'
import icon from '../assets/group.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidate } from '../helper/validate';
import convertToBase64  from '../helper/convert';
import useFetch from '../hooks/fetch.hook';
import { updateUser } from '../helper/helper';

import styles from '../styles/Username.module.css';

export default function Profile() {

    const navigate = useNavigate();
    const [file, setFile] = useState();
    const [{isLoading, apiData, serverError}] = useFetch();

    const formik = useFormik({
        initialValues : {
            groupname: apiData?.groupname || '',
            email: apiData?.email || ''
        },
        enableReinitialize: true, // this is important to initialize with apiData!
        validate: profileValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            values = await Object.assign(values, {icon: file || apiData?.icon || ''});
            console.log(values);
            let updatePromise = updateUser(values);
            toast.promise(updatePromise, {
                loading: "Updating...",
                success: <b>Account Details updated!</b>,
                error: <b>Unable to update the account details. Please try again!</b>
            });
        }
    })

    /** Formik doesn't support file upload so we need to create this handler */
    const onUpload = async e => {
        const base64 = await convertToBase64(e.target.files[0]);
        setFile(base64);
    }

    const userLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    }

    if(isLoading) return(
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

    if(serverError) return(
        <div className="container mx-auto">
            <Toaster position='top-center' reverseOrder='false'></Toaster>
            <div className="flex justify-center items-center min-h-screen">
                <div className={styles.glass}>
                <h1 className='text-xl text-red-500 text-center py-10'>{serverError.message}</h1>
                <div className='text-center'><Link to='/'><button className={styles.btn} >Home</button></Link></div>
                </div>
            </div>
        </div>
    );

  return (
    <div className="container mx-auto">
        <Toaster position='top-center' reverseOrder='false'></Toaster>
        <div className="flex justify-center items-center min-h-screen">
            <div className={styles.glass}>
                <div className="title flex flex-col items-center">
                    <h4 className='heading text-2xl font-bold text-center lg:text-4xl'>Account Details</h4>
                    <span className='py-4 text-m w-2/3 text-center text-gray-500 lg:text-xl'>
                        You can update the account detail
                    </span>
                </div>

                <form className='py-1' onSubmit={formik.handleSubmit}>
                    <div className="profile flex justify-center py-4">
                        <label htmlFor="icon">
                            <img className={styles.icon_img_edit} src={file || apiData?.icon || icon} alt="icon"/>
                        </label>
                        <input onChange={onUpload} type="file" id="icon" name="icon"/>
                    </div>

                    <div className="textbox flex flex-col items-center gap-6">
                        <input {...formik.getFieldProps('groupname')} className={styles.textbox} type="text" placeholder='Group Name'/>
                        <input {...formik.getFieldProps('email')} className={styles.textbox} type="text" placeholder='Email *'/>
                        <button className={styles.btn} type="submit">Update</button>
                    </div>

                    <div className="text-center py-4">
                        <span className='text-m text-gray-500 lg:text-xl'>Come back later? &nbsp;<button onClick={userLogout} className='heading font-bold' to='/'>Logout</button></span>
                    </div>
                </form>

            </div>
        </div>
    </div>
  )
}
