import React from 'react'
import { useOutletContext } from 'react-router-dom';
import icon from '../../assets/personal.png';

import styles from '../../styles/Home.module.css';

export default function Members() {

    const [apiData] = useOutletContext();

    return (
        <div className={styles.glass}>
            <div className='w-[90%] max-w-[1000px] h-full mx-auto overflow-hidden lg:flex lg:flex-col lg:justify-center lg:item-center'>

                <div className="title flex flex-col items-start lg:items-center">
                    <h4 className='heading py-1 text-xl font-bold text-center lg:text-2xl lg:mt-5'>Member</h4>
                </div>

                <div className='container'>

                    <div className='add-member'>

                    </div>

                    <div className='member-list grid grid-template-col-200  rounded-xl'>
                        {apiData?.members.map((member, index)=>(
                            <div key={member._id} className="w-full flex items-center gap-5 text-gray-600 odd:bg-theme-light-blue even:bg-theme-light-plum odd:bg-opacity-10 even:bg-opacity-20 py-1 px-2">
                                <img src={member.membericon || icon} className="w-[50px] h-[50px] rounded-full border-2 border-white shadow-md "/>
                                {member.membername}
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </div>
    )
}
