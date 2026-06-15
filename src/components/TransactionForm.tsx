import { useEffect, useState } from "react";

import type { Account } from "../types/account";
import type { Category } from "../types/category";

import { accountService } from "../services/account.service";
import { categoryService } from "../services/category.service";
import { transactionService } from "../services/transaction.service";
import type { Transaction } from "../types/transaction";

interface Props {

    onTransactionCreated: () => void;

    editingTransaction: Transaction | null;

}

function TransactionForm({

    onTransactionCreated,

    editingTransaction

}: Props) {

    const [accounts, setAccounts] =
        useState<Account[]>([]);

    const [categories, setCategories] =
        useState<Category[]>([]);

    const [description, setDescription] =
        useState("");

    const [amount, setAmount] =
        useState("");

    const [type, setType] =
        useState("EXPENSE");

    const [categoryId, setCategoryId] =
        useState("");

    const [accountId, setAccountId] =
        useState("");

    useEffect(() => {

        const loadData = async () => {

            try {

                const accountsData =
                    await accountService.getAll();

                const categoriesData =
                    await categoryService.getAll();

                setAccounts(accountsData);

                setCategories(categoriesData);

            } catch (error) {

                console.error(error);

            }

        };

        loadData();

    }, []);

    useEffect(() => {

        if (!editingTransaction) {
    
            return;
    
        }
    
        setDescription(
            editingTransaction.description
        );
    
        setAmount(
            editingTransaction.amount
        );
    
        setType(
            editingTransaction.type
        );
    
        setCategoryId(
            editingTransaction.categoryId.toString()
        );
    
        setAccountId(
            editingTransaction.accountId.toString()
        );
    
    }, [editingTransaction]);

    async function handleSubmit() {

        try {
    
            if (editingTransaction) {
    
                await transactionService.update(
    
                    editingTransaction.id,
    
                    {
    
                        amount: Number(amount),
    
                        description,
    
                        type,
    
                        accountId: Number(accountId),
    
                        categoryId: Number(categoryId)
    
                    }
    
                );
    
            } else {
    
                await transactionService.create({
    
                    amount: Number(amount),
    
                    description,
    
                    type,
    
                    accountId: Number(accountId),
    
                    categoryId: Number(categoryId)
    
                });
    
            }
    
            onTransactionCreated();
    
            setDescription("");
    
            setAmount("");
    
            setType("EXPENSE");
    
            setCategoryId("");
    
            setAccountId("");
    
        } catch (error) {
    
            console.error(error);
    
        }
    
    }

    return (

        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">

            <h2 className="text-2xl font-bold text-slate-800 mb-6">

                New Transaction

            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>

                    <label className="block mb-2 text-slate-700">

                        Description

                    </label>

                    <input
                        type="text"
                        className="w-full border border-slate-300 rounded-lg p-3"
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                    />

                </div>

                <div>

                    <label className="block mb-2 text-slate-700">

                        Amount

                    </label>

                    <input
                        type="number"
                        className="w-full border border-slate-300 rounded-lg p-3"
                        value={amount}
                        onChange={(e) =>
                            setAmount(e.target.value)
                        }
                    />

                </div>

                <div>

                    <label className="block mb-2 text-slate-700">

                        Type

                    </label>

                    <select
                        className="w-full border border-slate-300 rounded-lg p-3"
                        value={type}
                        onChange={(e) =>
                            setType(e.target.value)
                        }
                    >

                        <option value="INCOME">

                            INCOME

                        </option>

                        <option value="EXPENSE">

                            EXPENSE

                        </option>

                    </select>

                </div>

                <div>

                    <label className="block mb-2 text-slate-700">

                        Category

                    </label>

                    <select
                        className="w-full border border-slate-300 rounded-lg p-3"
                        value={categoryId}
                        onChange={(e) =>
                            setCategoryId(e.target.value)
                        }
                    >

                        <option value="">
                            Select a category
                        </option>

                        {
                            categories.map((category) => (

                                <option
                                    key={category.id}
                                    value={category.id}
                                >

                                    {category.name}

                                </option>

                            ))
                        }

                    </select>

                </div>

                <div>

                    <label className="block mb-2 text-slate-700">

                        Account

                    </label>

                    <select
                        className="w-full border border-slate-300 rounded-lg p-3"
                        value={accountId}
                        onChange={(e) =>
                            setAccountId(e.target.value)
                        }
                    >

                        <option value="">
                            Select an account
                        </option>

                        {
                            accounts.map((account) => (

                                <option
                                    key={account.id}
                                    value={account.id}
                                >

                                    {account.name}

                                </option>

                            ))
                        }

                    </select>

                </div>

            </div>

            <button
                onClick={handleSubmit}
                className="mt-8 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-semibold transition"
            >

                Save Transaction

            </button>

        </div>

    );

}

export default TransactionForm;