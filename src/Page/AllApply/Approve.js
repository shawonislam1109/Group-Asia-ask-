import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { useForm } from 'react-hook-form';

const Approve = () => {
    const updateData = useLoaderData() ; 
    console.log(updateData) ; 
    const { user } = useContext(AuthContext)
    const [ checking, setChecking ] = useState(false)
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
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

    }
    const CheckBox = (data) =>
    {
        setChecking(data.target.checked)
    }
    return (
        <div>
            <div className=' background relative  py-9 md:w-9/12 mx-auto mt-20 rounded-lg shadow-xl '>
                <div className='md:w-9/12 mx-auto'>
                   

                    <div className='flex justify-center  items-center '>
                        <form className='md:w-2/3' onSubmit={ handleSubmit(UpdateApply) }>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text text-xl  font-bold text- 
                                     violet-500">Name</span>
                                </label>
                                <input { ...register("name",
                                    { required: 'This  is required' }
                                ) } type="text" placeholder="Your Name" className="input 
                                 input-bordered input-secondary w-64 md:w-full text-xl" />
                                {
                                    errors.name && <p role='alert' className='text-red-500 
                                     text-xl mt-3'>{ errors.name?.message }</p>
                                }
                            </div>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text text-xl  font-bold text- 
                                     violet-500">Email</span>
                                </label>
                                <input { ...register("email",
                                    { required: 'This  is required' }
                                ) } type="text" placeholder="Your Name" className="input 
                                 input-bordered input-secondary w-64 md:w-full text-xl" />
                                {
                                    errors.email && <p role='alert' className='text-red-500 
                                     text-xl mt-3'>{ errors.email?.message }</p>
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
                                ) } placeholder=' Application write  ' className='rounded-md pl-5 text-md pt-2' rows="10" cols="20"></textarea>
                                {
                                    errors.textarea && <p role='alert' className='text-red-500 
                                     text-xl mt-3'>{ errors.textarea?.message }</p>
                                }
                            </div>




                            <div>
                                
                                            <button className='w-full  font-bold bg-violet-900 cursor-pointer mt-7 
                                              text-white text-center p-3 rounded-lg'
                                                value='Save' type="submit">Send</button>
                                        
                              
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Approve;
