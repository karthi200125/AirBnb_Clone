"use client"

import UseRentModal from "@/app/Hooks/UseRentModal"
import Modal from "./Modal"
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../Navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import Map from "../Map";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}


const RentModal = () => {

    const rentModal = UseRentModal();
    const [step, setStep] = useState(STEPS.CATEGORY)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: "",
            description: ''
        }
    })


    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestcount', 1);
    const roomCount = watch('roomcount', 1);
    const bathroomCount = watch('bathroomcount', 1);
    const imageSrc = watch('imageSrc');

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location])

    const setCustomvalue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    const onBack = () => {
        setStep(value => value - 1)
    }
    const onNext = () => {
        setStep(value => value + 1)
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) return 'Create'
        return "Next"
    }, [step])
    const secondActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) return undefined
        return "Bext"
    }, [step])

    let bodyContent = (
        <div className="flex flex-col gap-8 ">
            <Heading title='which od these best describers your place' subtitle="Pick a category" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput onClick={(category) => setCustomvalue('category', category)} selected={category === item.label} label={item.label} icon={item.icon} />
                    </div>
                ))}
            </div>
        </div>
    )

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Where is your place located" subtitle="help guests find you" />
                <CountrySelect onChange={(value) => setCustomvalue('location', value)} value={location} />
                <Map center={location?.latlng} />
            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Share some Basics about your plane" subtitle="What aminities do you have?" />
                <Counter title="Guests" subtitle="How many Guests do you allow?" value={guestCount} onChange={(value) => setCustomvalue('guestcount', value)} />
                <hr />
                <Counter title="Rooms" subtitle="How many Rooms do you Have?" value={roomCount} onChange={(value) => setCustomvalue('roomcount', value)} />
                <hr />
                <Counter title="BathRooms" subtitle="How many Bathrooms do you have?" value={bathroomCount} onChange={(value) => setCustomvalue('bathroomcount', value)} />
            </div>
        )
    }


    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col ga-8">
                <Heading title="Add photo of your place" subtitle="Show guests wehat your place looks like" />
                <ImageUpload value={imageSrc} onChange={(value) => setCustomvalue('imageSrc', value)} />
            </div>
        )
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="How would you describe your place" subtitle="Short and Sweet works best" />
            </div>
        )
    }

    return (
        <Modal title="Airbnb Your Home" isOpen={rentModal.isOpen} onClose={rentModal.onClose} onSubmit={onNext} actionLabel={actionLabel} secondaryActionLabel={secondActionLabel} secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            body={bodyContent}
        />
    )
}

export default RentModal