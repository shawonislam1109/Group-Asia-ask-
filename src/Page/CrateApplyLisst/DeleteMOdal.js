import React from 'react';

const DeleteMOdal = ( stateDelete,setSateDelete,refetch ) =>
{
  
    const Delete = (id) =>{
        fetch(`http://localhost:5000/deleteEmploye/${id}`,{
            method:"DELETE",

        })
        .then(res => res.json())
        .then(data => {
            if (data.acknowledged) {
                setSateDelete(null);
                refetch();
               
            }
        })
    }


    return (
        <div>
            
            <input type="checkbox" id="DeleteEmploye" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="DeleteEmploye" className="btn btn-sm btn-circle        
                      absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Do You want to delete it ??</h3>
                    <p className="py-4">If you want to delete it press the confirm button </p>
                <button onClick={()=>Delete(stateDelete.stateDelete)} className='btn-xs btn-secondary        font-bold   
                     rounded-sm'>confirm</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteMOdal;
