import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import './Home.css'
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const Home = () =>
{
    const { user } = useContext(AuthContext)
    const [ checking, setChecking ] = useState(false)
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const sweetAlert = () =>
    {
        Swal.fire(
            'Successfully your Data added ',
            'You clicked the button!',
            'success'
        )
    }

    const addTaskSubmit = (data) =>
    {

        const UserData = {
            name: data.name,
            select: data.select,
            terms_condition: checking,
            email: user?.email
        }
        console.log(UserData)

        fetch('https://company-task-server.vercel.app/userData', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(UserData)
        })
            .then(res => res.json())
            .then(data =>
            {
                console.log(data)
                reset()
                sweetAlert();
            })
    }
    const CheckBox = (data) =>
    {
        setChecking(data.target.checked)
    }
    return (
        <div className='mx-3 md:mx-0 '>
            <div className=' background relative  py-16 rounded-lg shadow-2xl  md:w-2/3 mx-auto px-10  mt-28'>
                <div className='md:w-9/12 mx-auto px-10 md:px-0 mb-10'>
                    <div className='flex justify-center items-center'>
                        <img className=' border-4 border-violet-600 w-28 h-28 md:w-40 md:h- 
                          40 rounded-full absolute md:-top-20 -top-12' 
                           src="https://assets.propertyshelf.com/nicaragua/2-fill-up- 
                            form.png/image" alt="" />
                        <h1 className='text-center text-2xl md:text-3xl mt-10 font-bold'> 
                         <span className='text-violet-500'>Admin Create</span> Employees 
                          </h1>
                    </div>

                    <div className='flex justify-center items-center'>
                        <form className='md:w-2/3' onSubmit={ handleSubmit(addTaskSubmit) }>
                            <div className="form-control w-full   ">
                                <label className="label">
                                    <span className="label-text text-xl  font-bold text- 
                                     violet-500">Name</span>
                                </label>
                                <input { ...register("name",
                                    { required: 'This  is required' }
                                ) } type="text" placeholder="Your Name" className="input 
                                 input-bordered input-secondary w-full text-xl" />
                                {
                                    errors.name && <p role='alert' className='text-red-500 
                                     text-xl mt-3'>{ errors.name?.message }</p>
                                }
                            </div>



                            <div className=" mt-3 flex justify-start items-center ml-2">
                                <label className="label cursor-pointer">
                                    <input onClick={ CheckBox } type="checkbox" 
                                     className="checkbox checkbox-primary" />
                                </label>
                                <span className="font-semibold ml-2 ">Agree to terms</span>
                            </div>


                            <div>
                                {
                                    checking ?

                                        <>
                                            <button className='w-full  font-bold bg-violet- 
                                             700 hover:bg-violet-900 cursor-pointer mt-7 
                                              text-white text-center p-3 rounded-lg' 
                                               value='Save' type="submit">Save</button></>
                                        :
                                        <>
                                            <button disabled className='w-full  font-bold 
                                             bg-violet-700 hover:bg-violet-900 cursor-not- 
                                              allowed mt-7 text-white text-center p-3 
                                               rounded-lg' value='Save' 
                                                type="submit">Save</button>
                                        </>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;