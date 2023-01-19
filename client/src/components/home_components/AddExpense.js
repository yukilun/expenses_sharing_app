import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { useFormik } from 'formik';
import { FaPlus } from "react-icons/fa";
import { FaShoppingBasket, FaHamburger, FaHome, FaFaucet, FaIcons, FaBus, FaShieldAlt, FaQuestion } from 'react-icons/fa';
import { MdKeyboardArrowDown } from 'react-icons/md';
import SlideController from './SlideController';
import { useOutletContext , useNavigate} from 'react-router-dom';
import icon from '../../assets/personal.png';
import { addExpenseValidate } from '../../helper/homeValidate';
import { addExpense } from '../../helper/homeHelper';

import 'swiper/css';
import styles from '../../styles/Home.module.css';
import { toast } from 'react-hot-toast';


export default function AddExpense() {

  const navigate = useNavigate();
  const [apiData] = useOutletContext();
  const [category, setCategory] = useState('');
  const [memberIndex, setMemberIndex] = useState(-1);
  const [showMemberDropdown, setShowMemberDropdown] = useState(false);

  const categoryCommonClass = 'text-[60px] p-4 rounded-lg text-white text-opacity-90 shadow-md lg:text-[80px] lg:p-6 ';

  const categories = [
    {
      name: "Grocery",
      icon: <FaShoppingBasket className={categoryCommonClass + 'bg-[#7bdff2]'} />,
    },
    {
      name: "Food",
      icon: <FaHamburger className={categoryCommonClass + 'bg-[#f1c0e8]'} />,
    },
    {
      name: "Housing",
      icon: <FaHome className={categoryCommonClass + 'bg-[#E78EA9]'} />,
    },
    {
      name: "Utilities",
      icon: <FaFaucet className={categoryCommonClass + 'bg-[#fbc4ab]'} />,
    },
    {
      name: "Entertainment",
      icon: <FaIcons className={categoryCommonClass + 'bg-[#CDB699]'} />,
    },
    {
      name: "Transportation",
      icon: <FaBus className={categoryCommonClass + 'bg-[#ccd5ae]'} />,
    },
    {
      name: "Insurance",
      icon: <FaShieldAlt className={categoryCommonClass + 'bg-[#a1c5e7]'} />,
    },
    {
      name: "Others",
      icon: <FaQuestion className={categoryCommonClass + 'bg-[#bcb6f6]'} />,
    }
  ];

  const formik = useFormik({
    initialValues: {
      category: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      description: ''
    },
    validate: async values => {
      const errors = addExpenseValidate(values);
      if(memberIndex < 0) errors.member = toast.error('Member required!');
      if(category === '') errors.category = toast.error('Category required!');
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      values = Object.assign(values, { category, member: apiData?.members[memberIndex]._id});
      console.log(values);
      let addPromise = addExpense(values);
      toast.promise(addPromise, {
          loading: 'Adding Expense...',
          success: <b>Added Expense Successfully!</b>,
          error: <b>Unable to add expense! Please try again later.</b>
      });
      addPromise.then(() => navigate('/'));
    }
  })

  return (
    <div className={styles.glass}>
      <div className='w-[90%] max-w-[1000px] min-h-full mx-auto overflow-hidden lg:flex lg:flex-col lg:justify-center lg:item-center'>

        <div className="title">
          <h4 className='heading py-1 text-xl font-bold text-center lg:text-2xl lg:mt-5'>Add Expense</h4>
        </div>

        <form onSubmit={formik.handleSubmit}>

          {/*category*/}
          <div className='w-[calc(100%_+_30px)] my-3 lg:w-full'>
            <h6 className='text-gray-600 text-base my-4 lg:text-lg'>Category*: &nbsp;
              {category === '' ? <span className='text-theme-plum'>No Category Selected</span> : <span className='text-theme-blue text-bold'>{category}</span>}
            </h6>
            <Swiper
              slidesPerView={3}
              spaceBetween={20}
              grabCursor={true}
              touchEventsTarget='container'
              slidesOffsetBefore={10}
              slidesOffsetAfter={40}
              breakpoints={{
                320: { slidesPerView: 4 },
                625: { slidesPerView: 5 },
                768: { slidesPerView: 6 },
                1024: { slidesPerView: 6, slidesOffsetBefore: 0, slidesOffsetAfter: 0 },
                1300: { slidesPerView: 7, slidesOffsetBefore: 0, slidesOffsetAfter: 0 },
              }}
              className="w-full"
            >
              {
                categories.map((cat, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <input type="radio" name="category" id={cat.name} value={cat.name} className='hidden peer' 
                        onChange={(e) => setCategory(e.target.value)}
                      />
                      <label htmlFor={cat.name} className='flex flex-col gap-1 text-gray-600 items-center opacity-50 cursor-pointer hover:opacity-100 peer-checked:opacity-100'>
                        {cat.icon} <span className='text-[10px] lg:text-sm'>{cat.name}</span>
                      </label>
                    </SwiperSlide>
                  );
                })
              }
              <SlideController />
            </Swiper>
          </div>

          <div className='flex flex-col gap-5 md:grid md:grid-cols-2'>

            {/*amount*/}
            <div className='flex flex-col gap-3 relative z-0 lg:flex-row lg:my-1 lg:items-center lg:justify-between lg:max-w-[380px]'>
              <label htmlFor='amount' className='text-gray-600 text-base lg:text-lg'>Amount*: </label>
              <input {...formik.getFieldProps('amount')} type="number" id="amount" placeholder='Amount' step="0.01" className={styles.textbox}  />
            </div>

            {/*member*/}
            <div className='flex flex-col gap-3 relative z-10 lg:flex-row lg:my-1 lg:items-center lg:justify-between lg:max-w-[380px]'>
              <label htmlFor='member' className='text-gray-600 text-base lg:text-lg'>Paid By*: </label>

              <div
                className={styles.inputbox}
                onClick={() => setShowMemberDropdown(prev => !prev)}
              >
                <div className='flex gap-5 items-center'>
                  <img src={ memberIndex > -1 ? apiData?.members[memberIndex].membericon || icon: icon} className="h-[50px] w-[50px] rounded-full" />
                  {memberIndex >= 0 && apiData?.members[memberIndex].membername || ''}
                   

                </div>
                <MdKeyboardArrowDown className='absolute z-20 top-1/2 translate-y-[-50%] right-[12px] text-[30px]' />

                <ul className={(showMemberDropdown ? 'block ' : 'hidden ') + ' absolute bottom-0 left-0 translate-y-[110%] bg-white w-full rounded-xl max-h-[200px] lg:max-h-[160px] overflow-auto shadow-lg cursor-pointer'}>
                  {apiData?.members && apiData.members.map((member, index) => (
                    <li
                      key={index}
                      className="flex gap-5 items-center p-2 hover:bg-gray-200  first-of-type:rounded-t-xl last-of-type:rounded-b-xl"
                      onClick={() => setMemberIndex(index)}
                    >
                      <img src={member.membericon || icon} className="h-[50px] w-[50px] rounded-full" />{member.membername}
                    </li>
                  ))}
                </ul>

              </div>
            </div>

            {/*Date*/}
            <div className='flex flex-col gap-3 relative z-0 lg:flex-row lg:my-1 lg:items-center lg:justify-between lg:max-w-[380px]'>
              <label htmlFor='date' className='text-gray-600 text-base lg:text-lg'>Date*: </label>
              <input {...formik.getFieldProps('date')} type="date" id="date" placeholder='Date' className={styles.inputbox}  />
            </div>

            {/*Description*/}
            <div className='flex flex-col gap-3 relative z-0 lg:flex-row lg:my-1 lg:items-center lg:justify-between lg:max-w-[380px]'>
              <label htmlFor='description' className='text-gray-600 text-base lg:text-lg'>Description: </label>
              <input {...formik.getFieldProps('description')} type="text" id="description" placeholder='Description' className={styles.textbox} />
            </div>

          </div>

          <div className='w-full text-center relative z-0'>
            <button className='bg-theme-light-blue text-white text-base text-center w-3/4 max-w-[200px] 
                                 border py-3 rounded-lg shadow-md mt-14 mb-5 mx-auto lg:text-lg hover:bg-theme-blue lg:mt-10'>Add</button>
          </div>

        </form>
      </div>
    </div>
  )
}
