import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import errorPage from './404page.png'

const ErrorPage = () => {
    return (
        <div>
            <div className='flex flex-col min-h-[700px] justify-center items-center'>
                <div >
                    <img src={errorPage} alt="" />
                    <h1 className='text-4xl text-center'>Ops! An Error Ocurred!</h1>
                    <br />
                    <p className='text-xl text-red-500 font-bold text-center'>404</p>
                    <p className='text-2xl text-yellow-500 text-center'>Not Found page</p>
                    <div className='flex justify-center items-center mt-5'>
                        <Link to='/' className='bg-red-500 text-white px-3 py-2 flex justify-center items-center font-semibold rounded-sm'>Go to home <FaArrowRight className='ml-3'></FaArrowRight> </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;