import type { ReactNode } from "react";

interface Props {
    title: string;
    value: number;
    color: string;
    icon: ReactNode;
}

function SummaryCard({
    title,
    value,
    color,
    icon
}: Props) {

    return (

        <div className="bg-white rounded-2xl shadow-md p-6">

            <div className="flex items-center justify-between">

                <div>

                    <h3 className="text-gray-500 text-sm">

                        {title}

                    </h3>

                    <p className={`text-4xl font-bold mt-3 ${color}`}>

                        ${value.toLocaleString()}

                    </p>

                </div>

                <div>

                    {icon}

                </div>

            </div>

        </div>

    );

}

export default SummaryCard;