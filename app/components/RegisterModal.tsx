"use client";
import axios from 'axios';
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import UseregisterModal from '../Hooks/UseregisterModal';
import { useState } from 'react';
import Modal from './modals/Modal';
import Heading from './Heading';
import Input from './inputs/Input';
import toast from 'react-hot-toast';
import Button from './Button';


const RegisterModal = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ""
        }
    });

    const [isLoading, setIsLoading] = useState(false);
    const registermodal = UseregisterModal();

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        try {
            axios.post('/api/register', data)
            registermodal.onClose();
        } catch (error) {
            toast.error("Somthing Went Wrong")
        }
        finally {
            setIsLoading(false)
        }
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='Welcome to Airbnb' subtitle='Create an account' />
            <Input id='email' label='Email' disabled={isLoading} register={register} errors={errors} required />
            <Input id='name' label='Name' disabled={isLoading} register={register} errors={errors} required />
            <Input id='password' type='password' label='Password' disabled={isLoading} register={register} errors={errors} required />
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button outline label="Continue with Google" icon={FcGoogle} onClick={() => { }} />
            <Button outline label="Continue with Github" icon={AiFillGithub} onClick={() => { }} />
            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className=' justify-center flex flex-row items-center gap-2'>
                    <div>Already Have an account</div>
                    <div className='text-neutral-800 cursor-pointer hover:underline' onClick={registermodal.onClose}>Login</div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal disabled={isLoading} isOpen={registermodal.isOpen} title='Register' actionLabel='Continue' onClose={registermodal.onClose} onSubmit={handleSubmit(onSubmit)} body={bodyContent} footer={footerContent} />
    );
};

export default RegisterModal;
