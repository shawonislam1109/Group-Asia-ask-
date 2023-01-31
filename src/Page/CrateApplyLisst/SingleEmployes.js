import React, { useState } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js'

const SingleEmployes = ({ data,  refetch }) =>
{
    const { image, name, email, address } = data;
    const [ stateDelete, setSateDelete ] = useState(null);
    const sweetAlert = () =>
    {
        Swal.fire(
            'Successfully Deleted ',
            'You clicked the button!',
            'success'
        )
    }
    const Delete = (id) =>{
        fetch(`http://localhost:5000/deleteEmploye/${id}`,{
            method:"DELETE",

        })
        .then(res => res.json())
        .then(data => {
            if (data.acknowledged) {
                refetch();
                sweetAlert() ; 
            }
        })
    }
    return (
        <div className='flex justify-center items-center'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className='flex justify-center items-center '>
                        <img className='w-12 h-12 md:w-16 md:h-16 rounded-full' src={ image } alt="Shoes" />
                    </div>
                    <h2 className="card-title font-semibold">
                        { name }
                    </h2>
                    <p className='text-xl'>{ email }</p>
                    <p className='text-xl'>{ address }</p>
                    <div className="card-actions justify-end">
                        <label onClick={ () => Delete(data._id) } htmlFor="DeleteEmploye" className="btn-xs btn-error font-bold rounded-sm">Delete</label>
                    </div>
                </div>
            </div>
            {/* <div>
                {
                    stateDelete && <DeleteMOdal
                    stateDelete={ stateDelete }
                        setSateDelete={ setSateDelete }
                        refetch={ refetch }
                    />
                }
            </div> */}
        </div>
    );
}

export default SingleEmployes;
