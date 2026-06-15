import { useEffect, useState } from "react";

import type { Transaction } from "../types/transaction";
import { transactionService } from "../services/transaction.service";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TransactionForm from "../components/TransactionForm";
import {
    PencilSquareIcon,
    TrashIcon
} from "@heroicons/react/24/outline";

function TransactionsPage() {

    const [transactions, setTransactions] =
        useState<Transaction[]>([]);

    const [editingTransaction, setEditingTransaction] =
        useState<Transaction | null>(null);

    async function loadTransactions() {

        try {

            const data =
                await transactionService.getAll();

            setTransactions(data);

        } catch (error) {

            console.error(error);

        }

    }

    async function handleDelete(id: number) {

        const confirmed = window.confirm(
            "Are you sure you want to delete this transaction?"
        );

        if (!confirmed) {

            return;

        }

        try {

            await transactionService.delete(id);

            loadTransactions();

        } catch (error) {

            console.error(error);

        }

    }

    useEffect(() => {

        loadTransactions();

    }, []);

    return (

        <div className="flex min-h-screen bg-slate-100">

            <Sidebar />

            <div className="flex-1">

                <Navbar />

                <main className="p-8">

                    <h1 className="text-3xl font-bold text-slate-800">

                        Transactions

                    </h1>

                    <p className="mt-2 text-gray-500 mb-8">

                        Manage your transactions.

                    </p>

                    <TransactionForm
                        onTransactionCreated={loadTransactions}
                        editingTransaction={editingTransaction}
                    />

                    <div className="bg-white rounded-2xl shadow-md overflow-hidden">

                        {

                            transactions.map((transaction) => (

                                <div
                                    key={transaction.id}
                                    className="flex justify-between items-center p-6 border-b border-slate-100 hover:bg-slate-50 transition"
                                >

                                    <div>

                                        <h3 className="font-semibold text-slate-800 text-lg">

                                            {transaction.description}

                                        </h3>

                                        <p className="text-sm text-slate-500 mt-1">

                                            {transaction.category.name}

                                        </p>

                                    </div>

                                    <div className="flex items-center gap-6">

                                        <div
                                            className={
                                                transaction.type === "INCOME"
                                                    ? "text-emerald-600 font-bold text-xl"
                                                    : "text-red-500 font-bold text-xl"
                                            }
                                        >

                                            {
                                                transaction.type === "INCOME"
                                                    ? "+"
                                                    : "-"
                                            }

                                            $

                                            {
                                                Number(
                                                    transaction.amount
                                                ).toLocaleString()
                                            }

                                        </div>

                                        <div className="flex items-center gap-4">

                                            <button
                                                onClick={() =>
                                                    setEditingTransaction(transaction)
                                                }
                                                className="flex items-center gap-1 text-slate-500 hover:text-slate-700"
                                            >

                                                <PencilSquareIcon className="h-5 w-5" />

                                                Edit

                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleDelete(transaction.id)
                                                }
                                                className="flex items-center gap-1 text-red-500 hover:text-red-700"
                                            >

                                                <TrashIcon className="h-5 w-5" />

                                                Delete

                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))

                        }

                    </div>

                </main>

            </div>

        </div>

    );

}

export default TransactionsPage;