import React, { useState } from 'react'
import { BiChevronDown, BiChevronRight } from 'react-icons/bi'

export default function ShareExpenses() {

  const [isOpenOverview, setOpenOverview] = useState(true);
  const [isOpenSettleDebts, setOpenSettleDebts] = useState(true);

  return (
    <div className='w-full max-w-[1000px] h-[calc(100vh_-_96px)] mx-auto overflow-hidden pb-[20px] pt-[106px] lg:pt-[144px] lg:pb-0 lg:h-full'>
      <div className='h-full overflow-auto px-6 text-gray-600'>

        {/* overview */}
        <div>
          <div className='w-full text-lg flex '>
            <button className='flex-grow py-2 flex items-center lg:hidden' onClick={() => setOpenOverview(prev => !prev)}>
              {isOpenOverview ? <BiChevronDown className='text-3xl text-theme-blue' /> : <BiChevronRight className='text-3xl text-theme-blue' />}  Overview
            </button>
          </div>
          <div className={'' + (isOpenOverview ? 'static' : 'hidden')}>

          </div>
        </div>


        <div>
          <div className='w-full text-lg flex '>
            <button className='flex-grow py-2 flex items-center lg:hidden' onClick={() => setOpenSettleDebts(prev => !prev)}>
              {isOpenSettleDebts ? <BiChevronDown className='text-3xl text-theme-blue' /> : <BiChevronRight className='text-3xl text-theme-blue' />}  Settle Debts
            </button>
          </div>
          <div className={'' + (isOpenSettleDebts ? 'static' : 'hidden')}>

          </div>
        </div>

      </div>
    </div>
  )
}
