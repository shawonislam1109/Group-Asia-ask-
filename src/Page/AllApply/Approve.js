import React, { useContext, useRef} from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2/dist/sweetalert2.js'

const Approve = () =>
{
    const updateData = useLoaderData();
    console.log(updateData);
    const sweetAlert = () =>
    {
        Swal.fire(
            'Successfully send Email  ',
            'You clicked the button!',
            'success'
        )
    }
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const form = useRef() ;
    const UpdateApply = (datas) =>
    {
        

        emailjs.sendForm('service_6azic7d', 'template_9m2mk6t', form.current, 'AQtCHvz8hJZPzVBGg')
            .then((result) =>
            {
                console.log(result.text);
            
                fetch(`http://localhost:5000/approveApplication/${updateData._id}`, {
                    method : "PUT",
                    headers : {
                        'content-type' : 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    reset() ; 
                    sweetAlert() 
                })
            }, (error) =>
            {
                console.log(error.text);
            });
           

    }
    return (
        <div>
            <div className=' background relative  py-9 md:w-9/12 mx-auto mt-20       
             rounded-lg shadow-xl '>
                <div className='md:w-9/12 mx-auto'>


                    <div className='flex justify-center  items-center '>
                        <form ref={form} className='md:w-2/3' onSubmit={ handleSubmit(UpdateApply) }>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text text-xl  font-bold text- 
                                     violet-500">Name</span>
                                </label>
                                <input { ...register("user_name",
                                    { required: 'This  is required' }
                                ) } type="text" placeholder="Your Name" className="input 
                                 input-bordered input-secondary w-64 md:w-full text-xl" />
                                {
                                    errors.user_name && <p role='alert' className='text-red-500 
                                     text-xl mt-3'>{ errors.user_name?.message }</p>
                                }
                            </div>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text text-xl  font-bold text- 
                                     violet-500">Email</span>
                                </label>
                                <input { ...register("user_email",
                                    { required: 'This  is required' }
                                ) } type="text" placeholder="Your Name" className="input 
                                 input-bordered input-secondary w-64 md:w-full text-xl" />
                                {
                                    errors.user_email && <p role='alert' className='text-red-500 
                                     text-xl mt-3'>{ errors.user_email?.message }</p>
                                }
                            </div>
                            <div className="form-control w-full   ">
                                <label className="label">
                                    <span className="label-text text-xl  font-bold text- 
                                     violet-500">
                                        Application</span>
                                </label>
                                <textarea { ...register('message',
                                    { required: 'This is required field' }
                                ) } placeholder=' Application write  ' className='rounded-md pl-5 text-md pt-2' rows="10" cols="20"></textarea>
                                {
                                    errors.message && <p role='alert' className='text-red-500 
                                     text-xl mt-3'>{ errors.message?.message }</p>
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
