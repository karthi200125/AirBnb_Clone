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
            console.log(error)
        }
        finally {
            setIsLoading(false)
        }
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='Welcome to Airbnb' subtitle='Create an account' />
            <Input id='email' label='Email' disabled={isLoading} register={register} errors={errors} required/>
            <Input id='name' label='Name' disabled={isLoading} register={register} errors={errors} required/>
            <Input id='password' type='password' label='Password' disabled={isLoading} register={register} errors={errors} required/>
        </div>
    )

    return (
        <Modal disabled={isLoading} isOpen={registermodal.isOpen} title='Register' actionLabel='Continue' onClose={registermodal.onClose} onSubmit={handleSubmit(onSubmit)} body={bodyContent} />
    );
};

export default RegisterModal;
