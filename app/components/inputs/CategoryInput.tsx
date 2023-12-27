"use client"

import { IconType } from "react-icons"

interface CategoryInputProps {
    label: string,
    icon: IconType,
    selected?: boolean,
    onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({ label, icon: Icon, selected, onClick }) => {
    return (
        <div className={`rounded-xl border-2 flex p-4 gap-3 flex-col hover:border-black transition cursor-pointer ${selected ? 'border-black' : "border-neutral-200"}`} onClick={() => onClick(label)}>
            <Icon size={30} />
            <div className="font-semibold">{label}</div>
        </div>
    )
}

export default CategoryInput
