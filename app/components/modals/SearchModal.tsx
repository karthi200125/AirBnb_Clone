'use client'

import UseSearchModal from "@/app/Hooks/UseSearchModal"
import Modal from "./Modal"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useMemo, useState } from "react"
import { Range } from "react-date-range"
import dynamic from "next/dynamic"
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect"
import qs from "query-string"
import { formatISO } from "date-fns"
import Heading from "../Heading"
import Calendar from "../inputs/Calender"
import Counter from "../inputs/Counter"

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2
}

const SearchModal = () => {
    const searchModal = UseSearchModal()
    const router = useRouter()
    const params = useSearchParams()


    const [step, setstep] = useState(STEPS.LOCATION)
    const [location, setLocation] = useState<CountrySelectValue>()
    const [guestCount, setguestCount] = useState(1)
    const [roomCount, setroomCount] = useState(1)
    const [bathroomCount, setBathroomCount] = useState(1)
    const [DateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    })

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location])

    const onBack = useCallback(() => {
        setstep(value => value - 1);
    }, [])

    const onNext = useCallback(() => {
        setstep(value => value + 1);
    }, [])

    const onSubmit = useCallback(async () => {
        if (step !== STEPS.INFO) return onNext()
        let curentQuery = {}
        if (params) {
            curentQuery = qs.parse(params.toString())
        }

        const updatedQuery: any = {
            ...curentQuery,
            locationValue: location?.value,
            guestCount, roomCount, bathroomCount
        }

        if (DateRange.startDate) {
            updatedQuery.startDate = formatISO(DateRange.startDate)
        }
        if (DateRange.endDate) {
            updatedQuery.endDate = formatISO(DateRange.endDate)
        }

        const url = qs.stringifyUrl({ url: '/', query: updatedQuery }, { skipNull: true })

        setstep(STEPS.LOCATION)
        searchModal.onClose()
        router.push(url)
    }, [step, searchModal, roomCount, bathroomCount, guestCount, location, router, DateRange, onNext, params])

    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO) return 'Search'
        return 'Next'
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.LOCATION) return undefined
        return 'Back'
    }, [step])

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title="Where do you wanna go" subtitle="Find yur location" />
            <CountrySelect value={location} onChange={(value) => setLocation(value as CountrySelectValue)} />
            <hr />
            <Map center={location?.latlng} />
        </div>
    )

    if (step === STEPS.DATE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="When do you Wnat to Go" subtitle="Make Sure evryone is free" />
                <Calendar value={DateRange} onChange={(value) => setDateRange(value)} />
            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="More information" subtitle="Find Your perfect place" />
                <Counter title="Guests" subtitle="How Many Guests" value={guestCount} onChange={(value) => setguestCount(value)} />
                <Counter title="Rooms" subtitle="How Many Rooms you Need" value={roomCount} onChange={(value) => setroomCount(value)} />
                <Counter title="Bathroom" subtitle="How Many Bathrooms you need" value={bathroomCount} onChange={(value) => setBathroomCount(value)} />
            </div>
        )
    }

    return (
        <Modal isOpen={searchModal.isOpen} onClose={searchModal.onClose} onSubmit={onSubmit} title="Filters" actionLabel={actionLabel} body={bodyContent} secondaryAction={step === STEPS.LOCATION ? undefined : onBack} secondaryActionLabel={secondaryActionLabel} />
    )
}

export default SearchModal
