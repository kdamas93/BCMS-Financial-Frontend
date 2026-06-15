import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import BudgetForm from "../components/BudgetForm";
import BudgetList from "../components/BudgetList";

import type { Budget } from "../types/budget";
import { budgetService } from "../services/budget.service";

function BudgetPage() {

    const [budgets, setBudgets] =
        useState<Budget[]>([]);

    const [editingBudget, setEditingBudget] =
        useState<Budget | null>(null);

    async function loadBudgets() {

        try {

            const data =
                await budgetService.getAll();

            setBudgets(data);

        } catch (error) {

            console.error(error);

        }

    }

    async function handleDelete(id: number) {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this budget?"
            );

        if (!confirmed) {

            return;

        }

        try {

            await budgetService.delete(id);

            loadBudgets();

        } catch (error) {

            console.error(error);

        }

    }

    useEffect(() => {

        loadBudgets();

    }, []);

    return (

        <div className="flex min-h-screen bg-slate-100">

            <Sidebar />

            <div className="flex-1">

                <Navbar />

                <main className="p-8">

                    <h1 className="text-3xl font-bold text-slate-800">

                        Budgets

                    </h1>

                    <p className="mt-2 text-gray-500 mb-8">

                        Manage your budgets.

                    </p>

                    <BudgetForm
                        onBudgetCreated={loadBudgets}
                        editingBudget={editingBudget}
                        setEditingBudget={setEditingBudget}
                    />

                    <div className="mt-8">

                        <BudgetList
                            budgets={budgets}
                            setEditingBudget={setEditingBudget}
                            handleDelete={handleDelete}
                        />

                    </div>

                </main>

            </div>

        </div>

    );

}

export default BudgetPage;