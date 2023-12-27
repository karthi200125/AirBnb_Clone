'use client'

import useCountries from "@/app/Hooks/UseCountrySelect";
import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import('../Map'), { ssr: false })


interface ListingInfoProps {
    user: SafeUser | null;
    description: string;
    guestCount: number;
    roomCount: number;
    bathroomCount: number;
    category: {
        icon: IconType,
        label: string,
        description: string,
    } | null
    locationValue: string


}


const ListingInfo: React.FC<ListingInfoProps> = ({ user, description, roomCount, bathroomCount, guestCount, locationValue, category }) => {
    const { getByValue } = useCountries()
    const coordinates = getByValue(locationValue)?.latlng;
    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold flex items-center flex-row gap-2">
                    <div>Hosted By {user?.name}</div>
                    <Avatar src={user?.image} />
                </div>
                <div className="flex flex-row items-center font-light gap-4 text-neutral-500">
                    <div>{guestCount} Guests</div>
                    <div>{roomCount} Rooms</div>
                    <div>{bathroomCount} bathrooms</div>
                </div>
            </div>
            <hr />
            {category && (
                <ListingCategory icon={category.icon} label={category.label} description={category.description} />
            )}
            <hr />
            <div className="text-lg font-light text-neutral-500">{description}</div>
            <hr />
            <Map center={coordinates} />
        </div>
    )
}

export default ListingInfo