import { useEffect, useState } from "react";

import { budgetService } from "../services/budget.service";
import type { Budget } from "../types/budget";

interface Props {

    onBudgetCreated: () => void;

    editingBudget: Budget | null;

    setEditingBudget:
        React.Dispatch<
            React.SetStateAction<Budget | null>
        >;

}

function BudgetForm({

    onBudgetCreated,
    editingBudget,
    setEditingBudget

}: Props) {

    const [amount, setAmount] =
        useState("");

    const [month, setMonth] =
        useState("");

    const [year, setYear] =
        useState("");

    useEffect(() => {

        if (editingBudget) {

            setAmount(
                String(editingBudget.amount)
            );

            setMonth(
                String(editingBudget.month)
            );

            setYear(
                String(editingBudget.year)
            );

        }

    }, [editingBudget]);

    async function handleSubmit(
        e: React.FormEvent
    ) {

        e.preventDefault();

        try {

            const data = {

                amount: Number(amount),

                month: Number(month),

                year: Number(year)

            };

            if (editingBudget) {

                await budgetService.update(
                    editingBudget.id,
                    data
                );

            } else {

                await budgetService.create(
                    data
                );

            }

            setAmount("");

            setMonth("");

            setYear("");

            setEditingBudget(
                null
            );

            onBudgetCreated();

        } catch (error) {

            console.error(error);

        }

    }

    return (

        <div className="bg-white p-6 rounded-2xl shadow-md">

            <h2 className="text-xl font-semibold text-slate-800 mb-6">

                {

                    editingBudget

                        ? "Edit Budget"

                        : "Create Budget"

                }

            </h2>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) =>
                        setAmount(
                            e.target.value
                        )
                    }
                    className="w-full border rounded-lg px-3 py-2"
                />

                <input
                    type="number"
                    placeholder="Month"
                    value={month}
                    onChange={(e) =>
                        setMonth(
                            e.target.value
                        )
                    }
                    className="w-full border rounded-lg px-3 py-2"
                />

                <input
                    type="number"
                    placeholder="Year"
                    value={year}
                    onChange={(e) =>
                        setYear(
                            e.target.value
                        )
                    }
                    className="w-full border rounded-lg px-3 py-2"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >

                    Save

                </button>

            </form>

        </div>

    );

}

export default BudgetForm;