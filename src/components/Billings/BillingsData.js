import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Modal from './Modal';

const BillingsData = () => {
    const [closeModal, setCloseModal] = useState(false);
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        formData && axios.post('http://localhost:5000/api/add-billing', formData)
            .then(res => {
                if (res.status === 200) {
                    toast.success("Bill Added Secessfully.")
                    refetch();
                }
                else {
                    toast.error("An Error Occured, Please Try Again.")
                }
            })
            .catch(err => console.log(err))
    }, [formData]);

    const { data: billingList, refetch, isLoading } = useQuery({
        queryKey: ['billingList'],
        queryFn: () => fetch('http://localhost:5000/api/billing-list')
            .then(res => res.json())
    })

    return (
        <div className=' min-h-screen'>
            <div className=' bg-white py-1 flex items-center justify-between px-6'>
                <div className=' flex items-center my-4'>
                    <p className=' mx-4 text-black font-bold text-xl'>Billings</p>
                    <input type="text" placeholder="Type here" className="input input-bordered input-warning w-full max-w-xs" />
                </div>
                <div>
                    <label htmlFor="my-modal" onClick={ () => setCloseModal(true) } className=' btn btn-info rounded-lg font-bold text-lg'>Add New Bill</label>
                    {
                        closeModal && <Modal setFormData={ setFormData } setCloseModal={ setCloseModal }></Modal>
                    }
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full ">
                    <thead>
                        <tr>
                            <th>Billing ID</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Paid Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            billingList?.map(billing => <tr key={ billing._id } className="hover">
                                <th>{ billing?._id }</th>
                                <td>{ billing.name }</td>
                                <td>{ billing.email }</td>
                                <td>{ billing.phone }</td>
                                <td>{ parseInt(billing.ammount) }</td>
                                <td>
                                    <button className='btn btn-sm bg-gray-800 mr-4'>Edit</button>
                                    <button className='btn btn-sm bg-red-700'>Delete</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BillingsData;