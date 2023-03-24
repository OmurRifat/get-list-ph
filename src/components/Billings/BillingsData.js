import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';
import Modal from './Modal';

const BillingsData = () => {
    const { totalAmmount, setTotalAmmount } = useContext(AuthContext)
    const [closeModal, setCloseModal] = useState(false);
    const [formData, setFormData] = useState(null);
    const [billingId, setBillingId] = useState(null);
    const [updatedBilling, setUpdatedBilling] = useState(null)
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [cart, setCart] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    let previousAmmount = 0;

    useEffect(() => {
        formData && axios.post('https://get-list-ph-server.vercel.app/api/add-billing', formData)
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

    const { data: billingList = [], refetch } = useQuery({
        queryKey: ['billingList', page],
        queryFn: () => fetch(`https://get-list-ph-server.vercel.app/api/billing-list?page=${page}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setCount(data.count);
                return data.result;
            })
    })

    const pages = Math.ceil(count / size);

    const deleteBilling = (id) => {
        axios.delete(`https://get-list-ph-server.vercel.app/api/delete-billing/${id}`)
            .then(res => {
                if (res.status === 200) {
                    toast.success("Deleted Sucessfully.")
                    refetch()
                }
                else
                    toast.error("An error occured, please try again.")
            })
    }

    useEffect(() => {
        updatedBilling && axios.put(`https://get-list-ph-server.vercel.app/api/update-billing/${updatedBilling?._id}`, updatedBilling)
            .then(res => {
                if (res.status === 200) {
                    refetch()
                    toast.success("Edited Sucessfully.")
                }
                else {
                    toast.error("An error occured, please try again later.")
                }
            })
    }, [updatedBilling])

    useEffect(() => {
        for (let data of billingList) {
            console.log(data)
            previousAmmount = previousAmmount + parseInt(data?.ammount);
            setTotalAmmount(previousAmmount);
        }
    }, [billingList])

    return (
        <div className='relative'>
            <div className=' bg-white py-1 flex items-center justify-between px-6'>
                <div className=' flex items-center my-4'>
                    <p className=' mx-4 text-black font-bold text-xl'>Billings</p>
                    <input type="text" placeholder="Type here" className="input input-bordered input-warning w-full max-w-xs" />
                </div>
                <div>
                    <label htmlFor="my-modal" onClick={ () => setCloseModal(true) } className=' btn btn-info rounded-lg font-bold text-lg'>Add New Bill</label>
                    {
                        closeModal && <Modal setUpdatedBilling={ setUpdatedBilling } billingId={ billingId } setFormData={ setFormData } setCloseModal={ setCloseModal }></Modal>
                    }
                </div>
            </div>
            <div className="overflow-x-auto mb-10">
                <table className="table w-full ">
                    <thead>
                        <tr>
                            <th className=' z-0'>Billing ID</th>
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
                                    <label htmlFor="my-modal" onClick={ () => { setBillingId(billing); setCloseModal(true) } } className='btn btn-sm bg-gray-800 mr-4'>Edit</label>
                                    <button onClick={ () => deleteBilling(billing?._id) } className='btn btn-sm bg-red-700'>Delete</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            <div className="text-center absolute -bottom-24 left-1/2 mt-6">
                {
                    [...Array(pages).keys()].map(number => <button
                        key={ number }
                        className={ page === number ? ' bg-red-500 p-3 rounded-lg font-bold' : ' bg-gray-400 text-black p-3 mx-1 rounded-lg font-bold' }
                        onClick={ () => setPage(number) }
                    >
                        { number + 1 }
                    </button>)
                }
            </div>
        </div>
    );
};

export default BillingsData;