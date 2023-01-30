import React from 'react';
import { useForm } from 'react-hook-form';

const Modal = ({ setCloseModal, setFormData }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const formSubmit = (data) => {
        setCloseModal(false)
        setFormData(data)
    }
    return (
        <div>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <form onSubmit={ handleSubmit(formSubmit) }>
                        <label onClick={ () => setCloseModal(false) } className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <h3 className="font-bold text-lg">Please Fill-Up this Form</h3>
                        <input { ...register("name") } required type="text" placeholder="Your Full Name" className=" mb-2 mt-4 input input-bordered  w-full max-w-xs" />
                        <input { ...register("email") } required type="text" placeholder="Your Email" className=" mb-2 input input-bordered  w-full max-w-xs" />
                        <input { ...register("phone") } required type="number" placeholder="Your Phone Number" className=" mb-2 input input-bordered  w-full max-w-xs" />
                        <input { ...register("ammount") } required type="number" placeholder="Payable Bill" className=" mb-2 input input-bordered  w-full max-w-xs" />
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