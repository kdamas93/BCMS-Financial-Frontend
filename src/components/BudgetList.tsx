import type { Budget } from "../types/budget";

import {
    PencilSquareIcon,
    TrashIcon
} from "@heroicons/react/24/outline";

interface Props {

    budgets: Budget[];

    setEditingBudget:
        (budget: Budget) => void;

    handleDelete:
        (id: number) => void;

}

function BudgetList({

    budgets,
    setEditingBudget,
    handleDelete

}: Props) {

    return (

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">

            {

                budgets.map((budget) => (

                    <div
                        key={budget.id}
                        className="flex justify-between items-center p-6 border-b border-slate-100 hover:bg-slate-50 transition"
                    >

                        <div>

                            <h3 className="font-semibold text-slate-800 text-lg">

                                Budget $

                                {

                                    Number(
                                        budget.amount
                                    ).toLocaleString()

                                }

                            </h3>

                            <p className="text-sm text-slate-500">

                                Month: {budget.month}

                            </p>

                            <p className="text-sm text-slate-500">

                                Year: {budget.year}

                            </p>

                        </div>

                        <div className="flex items-center gap-4">

                            <button
                                onClick={() =>
                                    setEditingBudget(
                                        budget
                                    )
                                }
                                className="flex items-center gap-1 text-slate-500 hover:text-slate-700"
                            >

                                <PencilSquareIcon className="h-5 w-5" />

                                Edit

                            </button>

                            <button
                                onClick={() =>
                                    handleDelete(
                                        budget.id
                                    )
                                }
                                className="flex items-center gap-1 text-red-500 hover:text-red-700"
                            >

                                <TrashIcon className="h-5 w-5" />

                                Delete

                            </button>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}

export default BudgetList;