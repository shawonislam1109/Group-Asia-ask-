import React, { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import MappingData from './MappingData';

const MyApply = () => {
    const {user} = useContext(AuthContext) ; 
    
    const { data: MyApplyData  = [], isLoading, refetch } = useQuery({
        queryKey: ['application', user?.email],
        queryFn: async () =>
        {
    const res = await fetch(`http://localhost:5000/applicationmyData?email=${user?.email}`)
            const data = await res.json();
            return data;
        }
    })
    console.log(MyApplyData)  ;
    if (isLoading)
    {
        return <div className='text-center'><button className="btn loading">loading</button>
        </div>
    }
    return (
        <div className='md:w-9/12 mx-auto '>
          <h1 className='text-xl md:text-3xl text-center font-bold text-violet-600'> 
             My Application </h1>

             <div className='my-10'>
                {
                    MyApplyData && MyApplyData.map(data => <MappingData 
                    key={data._id}
                    data = {data} 
                    refetch = {refetch}
                    />)
                }
             </div>
        </div>
    );
}

export default MyApply;
