import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import icon from '../../assets/group.png';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidate } from '../../helper/validate';
import convertToBase64 from '../../helper/convert';
import { updateUser } from '../../helper/helper';

import styles from '../../styles/Home.module.css';

export default function Profile() {

    const [file, setFile] = useState();
    const [apiData] = useOutletContext();

    const formik = useFormik({
        initialValues: {
            groupname: apiData?.groupname || '',
            email: apiData?.email || ''
        },
        enableReinitialize: true, // this is important to initialize with apiData!
        validate: profileValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            values = await Object.assign(values, { icon: file || apiData?.icon || '' });
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

    return (
        <div className={styles.glass + " fixed h-[calc(100vh_-_116px)] left-1/2 translate-x-[-50%] overflow-x-hidden overflow-y-auto lg:h-[calc(100vh_-_40px)]"}>
            <div className='w-[95%] max-w-[1000px] mx-auto'>

                <div className="title">
                    <h4 className='heading py-1 text-xl font-bold text-center lg:text-2xl lg:mt-5'>Account Details</h4>
                </div>

                <div className='py-2'>
                    <form className='py-1' onSubmit={formik.handleSubmit}>
                        <div className="profile flex justify-center py-4">
                            <label htmlFor="icon">
                                <img className={styles.icon_img_edit} src={file || apiData?.icon || icon} alt="icon" />
                            </label>
                            <input onChange={onUpload} type="file" id="icon" name="icon" />
                        </div>

                        <div className="textbox mx-auto w-max flex flex-col gap-6">
                            <div className='flex flex-col gap-3 relative z-0 sm:flex-row sm:my-1 sm:items-center sm:justify-between sm:max-w-[380px]'>
                                <label htmlFor='groupname' className='text-gray-600 text-base whitespace-nowrap lg:text-lg'>Group Name: </label>
                                <input {...formik.getFieldProps('groupname')} className={styles.textbox} type="text" placeholder='Group Name' id='groupname' />
                            </div>
                            <div className='flex flex-col gap-3 relative z-0 sm:flex-row sm:my-1 sm:items-center sm:justify-between sm:max-w-[380px]'>
                                <label htmlFor='email' className='text-gray-600 text-base whitespace-nowrap lg:text-lg'>Email*: </label>
                                <input {...formik.getFieldProps('email')} className={styles.textbox} type="text" placeholder='Email *' id='email' />
                            </div>
                            {/* <input {...formik.getFieldProps('groupname')} className={styles.textbox} type="text" placeholder='Group Name' id='groupname' /> */}
                            {/* <input {...formik.getFieldProps('email')} className={styles.textbox} type="text" placeholder='Email *' id='email' /> */}
                            <button className='bg-theme-light-blue text-white text-base text-center w-3/4 max-w-[200px] 
                                 border py-3 rounded-lg shadow-md mt-5 mb-5 mx-auto lg:text-lg hover:bg-theme-blue' type="submit">Update</button>
                        </div>





                    </form>
                </div>
            </div>
        </div>
    )
}
