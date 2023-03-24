import React from 'react';
import { useForm } from 'react-hook-form';

const Modal = ({ setCloseModal, setFormData, billingId, setUpdatedBilling }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const formSubmit = (data) => {
        setCloseModal(false)
        setFormData(data)
    }

    const formUpdate = (data, e) => {
        setUpdatedBilling(data);
        setCloseModal(false)
        e.target.reset()
    }

    return (
        <div className='App'>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <form onSubmit={ !billingId ? handleSubmit(formSubmit) : handleSubmit(formUpdate) }>
                        <label onClick={ () => setCloseModal(false) } className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <h3 className="font-bold text-lg">Please Fill-Up this Form</h3>
                        <input { ...register("_id", { value: billingId?._id }) } disabled required type="text" placeholder="" className=" mb-2 mt-4 input input-bordered  w-full max-w-xs" />
                        <input { ...register("name", { value: billingId?.name }) } required type="text" placeholder="Your Full Name" className=" mb-2 input input-bordered  w-full max-w-xs" />
                        <input { ...register("email", { value: billingId?.email }) } required type="text" placeholder="Your Email" className=" mb-2 input input-bordered  w-full max-w-xs" />
                        <input { ...register("phone", { value: billingId?.phone, required: true, minLength: 11 }) } required type="number" placeholder="Your Phone Number" className=" mb-2 input input-bordered  w-full max-w-xs" />
                        {
                            errors?.phone?.type === "minLength" && <p className=' text-red-600'>Please enter an valid number</p>
                        }
                        <input { ...register("ammount", { value: billingId?.ammount }) } required type="number" placeholder="Payable Bill" className=" mb-2 input input-bordered  w-full max-w-xs" />
                        <div className="modal-action" >
                            <button type='submit' className=' btn btn-secondary rounded-lg'>Add/Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Modal;