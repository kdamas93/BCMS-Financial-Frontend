import type { Account } from "../types/account";

import {
    PencilSquareIcon,
    TrashIcon
} from "@heroicons/react/24/outline";

interface Props {

    accounts: Account[];

    setEditingAccount:
        (account: Account) => void;

    handleDelete:
        (id: number) => void;

}

function AccountList({

    accounts,
    setEditingAccount,
    handleDelete

}: Props) {

    return (

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">

            {

                accounts.map((account) => (

                    <div
                        key={account.id}
                        className="flex justify-between items-center p-6 border-b border-slate-100 hover:bg-slate-50 transition"
                    >

                        <div>

                            <h3 className="font-semibold text-slate-800 text-lg">

                                {account.name}

                            </h3>

                            <p className="text-sm text-slate-500">

                                {account.accountNumber}

                            </p>

                            <p className="text-sm text-slate-500">

                                {account.type}

                            </p>

                        </div>

                        <div className="flex items-center gap-6">

                            <div className="text-cyan-700 font-bold text-xl">

                                $

                                {

                                    Number(
                                        account.balance
                                    ).toLocaleString()

                                }

                            </div>

                            <div className="flex items-center gap-4">

                                <button
                                    onClick={() =>
                                        setEditingAccount(account)
                                    }
                                    className="flex items-center gap-1 text-slate-500 hover:text-slate-700"
                                >

                                    <PencilSquareIcon className="h-5 w-5" />

                                    Edit

                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(account.id)
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

    );

}

export default AccountList;