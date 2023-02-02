import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { Navigate, useLoaderData } from 'react-router-dom';

const UpdateApplication = ( ) =>
{
    const updateData = useLoaderData() ; 
    console.log(updateData) ; 
    const { user } = useContext(AuthContext)
    const [ checking, setChecking ] = useState(false)
    const { register, formState: { errors }, handleSubmit, reset } = useForm();


    const sweetAlert = () =>
    {
        Swal.fire(
            'Successfully create emmpolye ',
            'You clicked the button!',
            'success'
        )
    }


    const UpdateApply = (datas) =>
    {

        const updateEmpolyes = {

            email: user.email,
            name: user.displayName,
            date: datas.date,
            image: user.photoURL,
            application: datas.textarea,

        }

        console.log(updateEmpolyes);

        //  emmploy apply  update  data in DB


        fetch(`http://localhost:5000/updateapplication/${updateData._id }`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateEmpolyes)
        })
            .then(res => res.json())
            .then(data =>
            {
                console.log(data)
                sweetAlert();
                reset();
                Navigate('/myapply')
            })


    }
    const CheckBox = (data) =>
    {
        setChecking(data.target.checked)
    }
    return (
        <div>


            <div className=' background relative  py-9 md:w-9/12 mx-auto mt-20 rounded-lg shadow-xl '>
                <div className='md:w-9/12 mx-auto'>
                    <div className='flex justify-center items-center'>
                        <img className=' border-4 border-violet-600 w-16 h-16 rounded-full absolute      
          md:-top-20 -top-12'
                            src='https://cdn-icons-png.flaticon.com/512/1484/1484799.png' alt="" />
                        <h1 className='text-center  text-xl mt-10 font-bold'>
                            <span className='text-vilolet-500'>Update </span> Apply</h1>
                    </div>

                    <div className='flex justify-center  items-center '>
                        <form className='md:w-2/3' onSubmit={ handleSubmit(UpdateApply) }>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text text-xl  font-bold text- 
                                     violet-500">Date</span>
                                </label>
                                <input { ...register("date",
                                    { required: 'This  is required' }
                                ) } type="datetime-local" placeholder="Your email" className="input 
                                 input-bordered input-secondary w-64 md:w-full text-xl" />
                                {
                                    errors.date && <p role='alert' className='text-red-500 
                                     text-xl mt-3'>{ errors.date?.message }</p>
                                }
                            </div>


                            <div className="form-control w-full   ">
                                <label className="label">
                                    <span className="label-text text-xl  font-bold text- 
                                     violet-500">
                                        Application</span>
                                </label>
                                <textarea { ...register('textarea',
                                    { required: 'This is required field' }
                                ) } placeholder='emmployees Application write  ' className='rounded-md pl-5 text-md pt-2' rows="10" cols="20"></textarea>
                                {
                                    errors.textarea && <p role='alert' className='text-red-500 
                                     text-xl mt-3'>{ errors.textarea?.message }</p>
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
                                            <button className='w-full  font-bold bg-violet-900 cursor-pointer mt-7 
                                              text-white text-center p-3 rounded-lg'
                                                value='Save' type="submit">Update Apply</button></>
                                        :
                                        <>

                                        </>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default UpdateApplication;
