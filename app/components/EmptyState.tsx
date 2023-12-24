'use client'

import { useRouter } from "next/navigation"
import Heading from "./Heading"
import Button from "./Button"

interface EmptyProps {
    title?: string,
    subtitle?: string,
    showReset?: boolean,
}


const EmptyState: React.FC<EmptyProps> = ({ title = "No exact matchs", subtitle = "Try changing or removing some of the filters", showReset }) => {
    const router = useRouter()

    return (
        <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
            <Heading title={title} subtitle={subtitle} center />
            <div className="w-48 mt-4 ">{showReset &&
                <Button outline label="Remove all filters" onClick={() => router.push('/')} />
            }</div>
        </div>
    )
}

export default EmptyState