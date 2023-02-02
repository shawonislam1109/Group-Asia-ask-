import { useQueries, useQuery } from '@tanstack/react-query';
import React from 'react';
import ApplyingMaping from './ApplyingMaping';

const AllApply = () =>
{
    const { data: ApplyData = [], isLoading, refetch } = useQuery({
        queryKey: ['application'],
        queryFn: async () =>
        {
            const res = await fetch('http://localhost:5000/application')
            const data = await res.json();
            return data;
        }
    })
    if (isLoading)
    {
        return <div className='text-center'><button className="btn loading">loading</button>
        </div>
    }
    return (
        <div className='md:w-9/12 mx-auto '>
            <h1 className='text-xl md:text-3xl text-center font-bold text-violet-600'> 
             All Application </h1>
             <div className='my-10' >
                {
                    ApplyData && ApplyData.map(data => <ApplyingMaping
                    key={data._id}
                    applyData = {data}
                    refetch = {refetch}
                    /> )
                }
             </div>
        </div>
    );
}

export default AllApply;
