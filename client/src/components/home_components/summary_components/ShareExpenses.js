import React, { useEffect, useState } from 'react'
import { BiChevronDown, BiChevronRight } from 'react-icons/bi'
import { useOutletContext, useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/fetch.hook';
import loadingsvg from '../../../assets/loading.svg';
import serverErrorSvg from '../../../assets/server_error.svg';
import icon from '../../../assets/personal.png';
import { currencyFormatter } from '../../../helper/homeHelper';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import { shareExpenses } from '../../../helper/homeHelper';
import { toast } from 'react-hot-toast';

export default function ShareExpenses() {

  const navigate = useNavigate();
  const [apiData] = useOutletContext();
  const [{ isLoading, apiData: shareExpensesInfo, serverError }] = useFetch('getShareExpensesInfo');
  const [isOpenOverview, setOpenOverview] = useState(true);
  const [isOpenSettleDebts, setOpenSettleDebts] = useState(true);
  const [expensePerPerson, setExpensePerPerson] = useState('');
  const [settleDebtsArr, setSettleDebtsArr] = useState([]);
  const [isOpenPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    if (apiData && shareExpensesInfo && apiData.members.length > 0) {
      const perPerson = shareExpensesInfo.totalExpenses / apiData.members.length;
      const netAmounts = apiData.members.map((member) => (shareExpensesInfo?.memberTotalPaid.find((doc) => doc._id === member._id)?.totalPaid || 0) - perPerson);
      let settleDebts = Array.from(Array(netAmounts.length), () => Array(netAmounts.length));

      for (let i = 0; i < netAmounts.length; i++) {
        for (let j = 0; j < netAmounts.length; j++) {
          if (netAmounts[i] >= 0 || netAmounts[j] <= 0 || i === j) {
            settleDebts[i][j] = 0;
          }
          else if (Math.abs(netAmounts[i]) >= netAmounts[j]) {
            settleDebts[i][j] = netAmounts[j];
            netAmounts[j] = 0;
            netAmounts[i] = netAmounts[i] + netAmounts[j];
          }
          else if (Math.abs(netAmounts[i]) < netAmounts[j]) {
            settleDebts[i][j] = Math.abs(netAmounts[i]);
            netAmounts[i] = 0;
            netAmounts[j] = netAmounts[j] - netAmounts[i];
          }
        }
      }
      setExpensePerPerson(perPerson);
      setSettleDebtsArr(settleDebts);
    }
  }, [apiData, shareExpensesInfo]);

  async function handleShareExpense() {
    let sharePromise = shareExpenses();
    toast.promise(sharePromise, {
      loading: 'Settling Debts...',
      success: <b>All the expenses have been marked as shared!</b>,
      error: <b>Unable to settle debts! Please try again later.</b>
    });
    sharePromise.then(() => navigate(0));
  }

  if (isLoading) {
    return (
      <div className='w-full max-w-[1000px] h-[calc(100vh_-_96px)] mx-auto overflow-hidden pb-[20px] pt-[106px] lg:pt-[144px] lg:pb-0 lg:h-full flex justify-center items-center'>
            <img src={loadingsvg} alt='loading' className='w-[200px]' />
      </div>
    )
  };

  if (serverError) {
    return (
      <div className='w-full max-w-[1000px] h-[calc(100vh_-_96px)] mx-auto overflow-hidden pb-[20px] pt-[106px] lg:pt-[144px] lg:pb-0 lg:h-full flex flex-col justify-center items-center gap-4 text-center text-xl text-theme-plum'>
        <img src={serverErrorSvg} alt='server error' className='w-[250px]' />
        <h6 className='font-bold'>Internal Server Error</h6>
        <p>Sorry! Something went wrong.</p>
      </div>
    )
  }

  return (
    <div className='w-full max-w-[1000px] h-[calc(100vh_-_96px)] mx-auto overflow-hidden pb-[20px] pt-[106px] lg:pt-[144px] lg:pb-0 lg:h-full'>

      {/* Popup Window for No Member Case */}
      {isOpenPopup &&
        <div className='bg-black bg-opacity-30 w-screen h-screen fixed z-30 top-0 left-0'>
          <div className={'bg-white w-[90%] rounded-xl shadow-lg flex flex-col items-center p-4 gap-2 '
            + 'sm:w-[400px] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] lg:translate-x-[calc(-50%_+_145px)]'}
          >
            <IoClose className='text-2xl text-theme-blue self-end' onClick={() => setOpenPopup(false)} />
            <h6 className='heading font-bold text-lg'>Settled Debts</h6>
            <p className='text-base text-gray-600 max-w-[270px] text-center my-3' >
              Please make sure everyone on the list has paid the correct amounts to the corresponding member(s).
            </p>
            <p className='text-base text-gray-600 max-w-[270px] text-center my-3' >
              After clicking the confirm button, all the current expenses will be marked as 'shared', which is <span className='text-theme-plum'>non-reversible</span>.
            </p>
            <button
              className="bg-theme-light-blue text-white text-base text-center w-full max-w-[250px] border py-3 rounded-lg shadow-md mx-auto mb-4 lg:text-lg hover:bg-theme-blue"
              onClick={handleShareExpense}
            >
              Confirm
            </button>
          </div>
        </div>
      }

      <div className='h-full overflow-auto px-4 text-gray-600 lg:w-full lg:flex lg:gap-8'>

        {/* settle debts */}
        {shareExpensesInfo?.totalExpenses !== 0 && (
          <div className='lg:w-1/2'>

            <div className='w-full text-base flex lg:text-lg lg:flex-grow'>
              <button className='flex-grow py-2 flex items-center outline-none lg:cursor-default lg:justify-center' onClick={() => setOpenSettleDebts(prev => !prev)}>
                {isOpenSettleDebts ? <BiChevronDown className='text-3xl text-theme-blue lg:hidden' /> : <BiChevronRight className='text-3xl text-theme-blue lg:hidden' />}  Settle Debts
              </button>
            </div>

            <div className={(isOpenSettleDebts ? 'block' : 'hidden lg:block')}>
              {apiData && settleDebtsArr.map((row, i) => row.map((cell, j) => (
                cell > 0 && (
                  <div key={`${i}_${j}`} className="w-full my-1 flex items-center justify-between py-2 px-3 bg-white rounded-lg bg-opacity-50 shadow-sm text-sm">

                    <div className='flex items-center gap-2 text-gray-600 min-w-[35px]'>
                      <img src={apiData?.members[i].membericon || icon} className="w-[35px] h-[35px] rounded-full border-2 border-white shadow-md object-cover " />
                      <p className='text-xs whitespace-nowrap overflow-hidden text-ellipsis'>{apiData?.members[i].membername}</p>
                    </div>
                    <HiArrowNarrowRight className='text-theme-blue' />
                    <div className='flex items-center gap-2 text-gray-600 min-w-[35px]'>
                      <img src={apiData?.members[j].membericon || icon} className="w-[35px] h-[35px] rounded-full border-2 border-white shadow-md object-cover " />
                      <p className='text-xs whitespace-nowrap overflow-hidden text-ellipsis'>{apiData?.members[j].membername}</p>
                    </div>

                    <div className='heading font-bold'>
                      {currencyFormatter.format(cell)}
                    </div>

                  </div>
                )
              )))}

              <div className='my-2 text-center'>
                <button className='bg-theme-light-blue text-white text-base text-center w-3/4 max-w-[200px] my-4
                               border py-3 rounded-lg shadow-md lg:text-lg hover:bg-theme-blue' onClick={() => setOpenPopup(true)}>Settled Debts!</button>
              </div>
            </div>
          </div>
        )}

        {/* overview */}
        <div className='lg:w-1/2'>

          <div className='w-full text-base flex lg:text-lg'>
            <button className='flex-grow py-2 flex items-center outline-none lg:cursor-default lg:justify-center' onClick={() => setOpenOverview(prev => !prev)}>
              {isOpenOverview ? <BiChevronDown className='text-3xl text-theme-blue lg:hidden' /> : <BiChevronRight className='text-3xl text-theme-blue lg:hidden' />}Expenses Overview
            </button>
          </div>

          <div className={(isOpenOverview ? 'block' : 'hidden lg:block')}>
            {apiData?.members.map((member) => (
              <div key={member._id} className="w-full my-1 flex items-center justify-between py-2 px-3 bg-white rounded-lg bg-opacity-50 shadow-sm text-sm">

                <div className='flex items-center gap-2 text-gray-600 min-w-[35px]'>
                  <img src={member?.membericon || icon} className="w-[35px] h-[35px] rounded-full border-2 border-white shadow-md object-cover" />
                  <p className='text-xs whitespace-nowrap overflow-hidden text-ellipsis'>{member.membername}</p>
                </div>

                <div className='flex items-center gap-2 heading font-bold'>
                  <div>Paid:</div>
                  <div className='min-w-[85px]'>{currencyFormatter.format(shareExpensesInfo?.memberTotalPaid.find((doc) => doc._id === member._id)?.totalPaid || 0)}</div>
                </div>

              </div>
            ))}

            {shareExpensesInfo && (
              <div className="w-full my-1 flex justify-end py-3 px-3 border border-slate-300 gradient-light-bg rounded-lg shadow-sm font-bold text-sm">
                <div className='flex items-center gap-2 heading'>
                  <div>Total Expenses:</div>
                  <div className='min-w-[85px]'>{currencyFormatter.format(shareExpensesInfo.totalExpenses)}</div>
                </div>
              </div>
            )}

            {expensePerPerson !== '' && (
              <div className="w-full my-1 flex justify-end py-3 px-3 border border-slate-300 gradient-light-bg rounded-lg shadow-sm font-bold text-sm">
                <div className='flex items-center gap-2 heading'>
                  <div>Per Member:</div>
                  <div className='min-w-[85px]'>{currencyFormatter.format(expensePerPerson)}</div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  )
}