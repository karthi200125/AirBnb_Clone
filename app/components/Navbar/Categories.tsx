"use client"
import Container from "../Container"
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing } from "react-icons/fa";
import { IoDiamond } from "react-icons/io5";
import { BsSnow } from "react-icons/bs";
import CategoryBox from "../CategoryBox";

import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";

export const categories = [
    { label: "Beach", icon: TbBeach, description: "this property is close to the beach" },
    { label: "Windmills", icon: GiWindmill, description: "this property has  Windmills" },
    { label: "Modern", icon: MdOutlineVilla, description: "this property has  Windmills" },
    { label: "Count5ryside ", icon: TbMountain, description: "this property is in the country side" },
    { label: "Pools ", icon: TbPool, description: "this property  has the pools" },
    { label: "Islands ", icon: GiIsland, description: "this property  is on island" },
    { label: "Lake ", icon: GiBoatFishing, description: "this property  is in close to lake" },
    { label: "Sking ", icon: FaSkiing, description: "this property has skiiing activbities" },
    { label: "Castles ", icon: GiCastle, description: "this property is in a castle" },
    { label: "Camping ", icon: GiForestCamp, description: "this property has camping activities" },
    { label: "Artic ", icon: BsSnow, description: "this property has camping activities" },
    { label: "Cave ", icon: GiCaveEntrance, description: "this property is in acve" },
    { label: "Desert ", icon: GiCactus, description: "this property is in desert" },
    { label: "Barns ", icon: GiBarn, description: "this property is in Barn" },
    { label: "Lux ", icon: IoDiamond, description: "this property is in Barn" },
]

const Categories = () => {
    const params = useSearchParams();

    const category = params?.get("category");
    const pathname = usePathname();

    const isMainPage = pathname === "/";
    if (!isMainPage) return null;
    return (
        <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                {categories.map((item) => (
                    <CategoryBox key={item.label} label={item.label} selected={category === item.label} icon={item.icon} />
                ))}
            </div>
        </Container>
    )
}

export default Categories