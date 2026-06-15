import { useEffect, useState } from "react";

import { accountService } from "../services/account.service";
import type { Account } from "../types/account";

interface Props {

    onAccountCreated: () => void;
    editingAccount: Account | null;

}

function AccountForm({

    onAccountCreated,
    editingAccount

}: Props) {

    const [accountNumber, setAccountNumber] =
        useState("");

    const [name, setName] =
        useState("");

    const [type, setType] =
        useState("SAVINGS");

    const [balance, setBalance] =
        useState("");

    useEffect(() => {

        if (editingAccount) {

            setAccountNumber(
                editingAccount.accountNumber
            );

            setName(
                editingAccount.name
            );

            setType(
                editingAccount.type
            );

            setBalance(
                String(editingAccount.balance)
            );

        }

    }, [editingAccount]);

    async function handleSubmit(
        e: React.FormEvent
    ) {

        e.preventDefault();

        try {

            const data = {

                accountNumber,
                name,
                type,
                balance: Number(balance)

            };

            if (editingAccount) {

                await accountService.update(
                    editingAccount.id,
                    data
                );

            } else {

                await accountService.create(
                    data
                );

            }

            setAccountNumber("");
            setName("");
            setType("SAVINGS");
            setBalance("");

            onAccountCreated();

        } catch (error) {

            console.error(error);

        }

    }

    return (

        <div className="bg-white p-6 rounded-2xl shadow-md">

            <h2 className="text-xl font-semibold text-slate-800 mb-6">

                {
                    editingAccount
                        ? "Edit Account"
                        : "Create Account"
                }

            </h2>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                <input
                    type="text"
                    placeholder="Account Number"
                    value={accountNumber}
                    onChange={(e) =>
                        setAccountNumber(
                            e.target.value
                        )
                    }
                    className="w-full border rounded-lg px-3 py-2"
                />

                <input
                    type="text"
                    placeholder="Bank Name"
                    value={name}
                    onChange={(e) =>
                        setName(
                            e.target.value
                        )
                    }
                    className="w-full border rounded-lg px-3 py-2"
                />

                <select
                    value={type}
                    onChange={(e) =>
                        setType(
                            e.target.value
                        )
                    }
                    className="w-full border rounded-lg px-3 py-2"
                >

                    <option value="SAVINGS">
                        SAVINGS
                    </option>

                    <option value="CHECKING">
                        CHECKING
                    </option>

                </select>

                <input
                    type="number"
                    placeholder="Balance"
                    value={balance}
                    onChange={(e) =>
                        setBalance(
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

export default AccountForm;