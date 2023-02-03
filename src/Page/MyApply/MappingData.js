import React from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import UpdateApplication from './UpdateApplication';
import { Link } from 'react-router-dom';

const MappingData = ({ data, refetch }) =>
{
    const { image, email, date, application, name, _id } = data;
    const sweetAlert = () =>
    {
        Swal.fire(
            'Successfully Deleted ',
            'You clicked the button!',
            'success'
        )
    }

    const cancelApplication = (id) =>
    {

        fetch(`http://localhost:5000/deleteApplication/${ id }`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data =>
            {
                if (data.acknowledged)
                {
                    refetch();
                    sweetAlert();
                    console.log(data)
                }
            })
    }

    return (
        <div>
            <div className='flex justify-center items-center'>
                <div className="card card-side w-9/12 mt-8 bg-slate-200  shadow-xl">
                    <div className="card-body">
                        <div><img className='md:w-16 md:h-16  w-12 h-12 rounded-full' src={ image } alt="Movie" /></div>
                        <h2 className="card-title">{ name }</h2>
                        <p>Date : { date }</p>
                        <p>Email : { email }</p>
                        <p className='mt-5 ml-2'>Application : { application }</p>
                        <div className="card-actions justify-end">
                            <Link to={ `/updateApplication/${ _id }` }><button className="        
                              btn-sm rounded-md  btn-primary cursor-pointer">Edit</button>
                            </Link>
                            <button onClick={ () => cancelApplication(_id) } className="btn-sm rounded-md  btn-error">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MappingData;
