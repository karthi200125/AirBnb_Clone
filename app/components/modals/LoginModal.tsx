"use client";
import axios from 'axios';
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast';
import Button from '../Button';
import UseLoginModal from '@/app/Hooks/UseLoginModal';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import UseregisterModal from '@/app/Hooks/UseregisterModal';

const LoginModal = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ""
        }
    });

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const registermodal = UseregisterModal();
    const loginmodal = UseLoginModal();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        try {
            const callback = await signIn('credentials', { ...data, redirect: false });
            setIsLoading(false);

            if (callback?.ok) {
                toast.success("Login");
                router.refresh();
            }

            loginmodal.onClose();

            if (callback?.error) {
                toast.error(callback.error);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='Welcome Back' subtitle='Login in to your Account' />
            <Input id='email' label='Email' disabled={isLoading} register={register} errors={errors} required />
            <Input id='password' type='password' label='Password' disabled={isLoading} register={register} errors={errors} required />
        </div>
    );

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button outline label="Continue with Google" icon={FcGoogle} onClick={() => signIn('google')} />
            <Button outline label="Continue with Github" icon={AiFillGithub} onClick={() => signIn('github')} />
            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className=' justify-center flex flex-row items-center gap-2'>
                    <div>Already Have an account</div>
                    <div className='text-neutral-800 cursor-pointer hover:underline' onClick={loginmodal.onClose}>Login</div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal disabled={isLoading} isOpen={loginmodal.isOpen} title='Login' actionLabel='Continue' onClose={loginmodal.onClose} onSubmit={handleSubmit(onSubmit)} body={bodyContent} footer={footerContent} />
    );
};

export default LoginModal;
