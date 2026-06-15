import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

interface Props {
    totalIncome: number;
    totalExpense: number;
    balance: number;
}

function SummaryChart({
    totalIncome,
    totalExpense,
    balance
}: Props) {

    const data = [

        {
            name: "Income",
            value: totalIncome
        },

        {
            name: "Expenses",
            value: totalExpense
        },

        {
            name: "Balance",
            value: balance
        }

    ];

    return (

        <div className="bg-white rounded-2xl shadow-md p-6 mt-8">

            <h2 className="text-xl font-bold text-slate-800 mb-6">

                Financial Overview

            </h2>

            <div className="h-80">

                <ResponsiveContainer>

                    <BarChart
                        data={data}
                        barCategoryGap="40%"
                    >

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="name" />

                        <YAxis />

                        <Tooltip />

                        <Bar
                            dataKey="value"
                            radius={[8, 8, 0, 0]}
                            barSize={70}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}

export default SummaryChart;