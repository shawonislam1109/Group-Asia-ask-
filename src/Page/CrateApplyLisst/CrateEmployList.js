import { useQuery } from '@tanstack/react-query';
import React from 'react';
import SingleEmployes from './SingleEmployes';

const CrateEmployList = () =>
{
    const { data:employe = [], isLoading, refetch } = useQuery({
        queryKey: [ 'crateEmployes' ],
        queryFn: async () =>
        {
            const res = await fetch('http://localhost:5000/crateEmployes')
            const data = await res.json();
            return data
        }
    });

    if (isLoading) {
        return <div className='text-center'><button className="btn loading">loading</button></div>  }

    return (
        <div className='md:w-5/6 mx-auto my-12'>
            <h1 className='text-xl md:text-3xl text-center font-bold text-violet-600'>Create Employeses
                list</h1>

            <div>
                {
                    !employe && <h1 className='text-xl mt-5 font-mono text-center text-red-500'>Admin no Crate Employe</h1>
                }
            </div>
            {/*  Emmploy list  */ }
            <div className='grid grid-cols-1 justify-center items-center gap-5 md:w-9/12 mx-auto mt-12'>
            {
                employe.map(data => <SingleEmployes 
                    data={data}
                    key={data._id}
                    isLoading={isLoading}
                    refetch={refetch}
                />)
            }

            </div>

        </div>
    );
}

export default CrateEmployList;
