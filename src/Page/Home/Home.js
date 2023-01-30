import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import './Home.css'
import { AuthContext } from '../../AuthProvider/AuthProvider';


const Home = () =>
{
    const { user } = useContext(AuthContext)
    const [ checking, setChecking ] = useState(false)
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const imgbbHostKey = process.env.REACT_APP_imgbbKey

    const sweetAlert = () =>
    {
        Swal.fire(
            'Successfully create emmpolye ',
            'You clicked the button!',
            'success'
        )
    }


    const addTaskSubmit = (data) =>
    {
       const image = data.image[0] ; 
      const fromData = new FormData() ;
      fromData.append('image', image)
        //  img Uupload in imgBB 

      const uri = `https://api.imgbb.com/1/upload?key=${imgbbHostKey}`;
      fetch(uri, {
        method: "POST",
        body: fromData 
      })
      .then(res => res.json())
      .then(imgData => {
        const employe = {
            image : imgData.data.url ,
            email : data.email ,
            name : data.name ,
            date : data.date ,
            address : data.textarea,
        }
        // create emmploy insert data in DB

        fetch('http://localhost:5000/createEmployes',{
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(employe)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            sweetAlert() ; 
            reset() ; 
        })
      })
    }
    const CheckBox = (data) =>
    {
        setChecking(data.target.checked)
    }
    return (
        <div className='mx-3 md:mx-0 '>
            <div className=' background relative  py-16 rounded-lg shadow-2xl  md:w-2/3   
             mx-auto px-10  my-28'>
                <div className='md:w-9/12 mx-auto px-10 md:px-0 mb-10'>
                    <div className='flex justify-center items-center'>
        <img className=' border-4 border-violet-600 w-28 h-28 md:w-40   
                          md:h-40 rounded-full absolute md:-top-20 -top-12' 
    src='https://cdn-icons-png.flaticon.com/512/1484/1484799.png' alt="" />
                        <h1 className='text-center text-2xl md:text-3xl mt-10 font-bold'>   
                          <span className='text-vilolet-500'>Admin Create</span> Employess </h1>
                    </div>

                    <div className='flex justify-center items-center'>
                        <form className='md:w-2/3' onSubmit={ handleSubmit(addTaskSubmit) }>
                            <div className="form-control w-full   ">
                                <label className="label">
                                    <span className="label-text text-xl  font-bold text- 
                                     violet-500">Date</span>
                                </label>
                                <input { ...register("date",
                                    { required: 'This  is required' }
                                ) } type="datetime-local" placeholder="Your email" className="input 
                                 input-bordered input-secondary w-full text-xl" />
                                {
                                    errors.date && <p role='alert' className='text-red-500 
                                     text-xl mt-3'>{ errors.date?.message }</p>
                                }
                            </div>
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

                            <div className="form-control w-full   ">
                                <label className="label">
                                    <span className="label-text text-xl  font-bold text- 
                                     violet-500">Upload Image</span>
                                </label>
                                <input {    
                                     ...register("image",
                                    { required: 'This  is required' }
                                ) } type="file" placeholder="upload Image" className="input 
                                 input-bordered input-secondary py-2 w-full text-xl" />
                                {
                                    errors.image && <p role='alert' className='text-red-500 
                                     text-xl mt-3'>{ errors.image?.message }</p>
                                }
                            </div>

                            <div className="form-control w-full   ">
                                <label className="label">
                                    <span className="label-text text-xl  font-bold text- 
                                     violet-500">Email</span>
                                </label>
                                <input { ...register("email",
                                    { required: 'This  is required' }
                                ) } type="email" placeholder="Your email" className="input 
                                 input-bordered input-secondary w-full text-xl" />
                                {
                                    errors.email && <p role='alert' className='text-red-500 
                                     text-xl mt-3'>{ errors.email?.message }</p>
                                }
                            </div>
                            <div className="form-control w-full   ">
                                <label className="label">
                                    <span className="label-text text-xl  font-bold text- 
                                     violet-500">Employes Address</span>
                                </label>
                                <textarea { ...register('textarea',
                                    { required: 'This is required field' }
                                ) } placeholder='emmployees Address and bio Data ' className='rounded-xl pl-5 text-xl pt-2' rows="10" cols="20"></textarea>
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
                                                value='Save' type="submit">Create Employe</button></>
                                        :
                                        <>
                                            <button disabled className='w-full  font-bold 
                                             bg-violet-700 hover:bg-violet-900        
                                               cursor-not-allowed mt-7 text-white       
                                                text-center p-3 
                                               rounded-lg' value='Save'
                                                type="submit">Create Employe</button>
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