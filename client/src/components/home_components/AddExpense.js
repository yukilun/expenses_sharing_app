import React from 'react';

import styles from '../../styles/Home.module.css';
import { FaShoppingBasket, FaHamburger, FaHome, FaFaucet, FaIcons, FaBus, FaShieldAlt, FaQuestion } from 'react-icons/fa';

export default function AddExpense() {

  const categoryCommonClass = 'text-[60px] p-4 rounded-lg text-white text-opacity-90 shadow-md ';

  const categories = [
    {
      name: "Grocery",
      icon: <FaShoppingBasket className= {categoryCommonClass +'bg-[#7bdff2]'}/>,
    },
    {
      name: "food",
      icon: <FaHamburger className= {categoryCommonClass +'bg-[#f1c0e8]'}/>,
    },
    {
      name: "Housing",
      icon: <FaHome className= {categoryCommonClass +'bg-[#E78EA9]'}/>,
    },
    {
      name: "Utilities",
      icon: <FaFaucet className= {categoryCommonClass +'bg-[#fbc4ab]'}/>,
    },
    {
      name: "Entertainment",
      icon: <FaIcons className= {categoryCommonClass +'bg-[#CDB699]'}/>,
    },
    {
      name: "Transportation",
      icon: <FaBus className= {categoryCommonClass +'bg-[#ccd5ae]'}/>,
    },
    {
      name: "Insurance",
      icon: <FaShieldAlt className= {categoryCommonClass +'bg-[#a1c5e7]'}/>,
    },
    {
      name: "Others",
      icon: <FaQuestion className= {categoryCommonClass +'bg-[#bcb6f6]'}/>,
    }
  ];

  return (
    <div className={styles.glass}>
      <div className="title flex flex-col items-center">
        <h4 className='heading py-1 text-xl font-bold text-center lg:text-2xl'>Add Expense</h4>
      </div>
      <div className='w-full my-3'>
        <h6 className='text-gray-600 text-lg my-4'>Category</h6>
        <div className={styles.cat_container}>
          {
            categories.map((cat, index) => {
              return (
                <div key={index}>
                  <input type="radio" name="category" id={cat.name} value={cat.name} className='hidden peer' required />
                  <label htmlFor={cat.name} className='flex flex-col gap-1 text-gray-600 items-center opacity-60 peer-checked:opacity-100'>
                    {cat.icon} <span className='text-xs'>{cat.name}</span>
                  </label>
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  )
}
