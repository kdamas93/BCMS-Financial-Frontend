import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import AccountForm from "../components/AccountForm";
import AccountList from "../components/AccountList";

import type { Account } from "../types/account";
import { accountService } from "../services/account.service";

function AccountsPage() {

    const [accounts, setAccounts] =
        useState<Account[]>([]);

    const [editingAccount, setEditingAccount] =
        useState<Account | null>(null);

    async function loadAccounts() {

        try {

            const data =
                await accountService.getAll();

            setAccounts(data);

        } catch (error) {

            console.error(error);

        }

    }

    async function handleDelete(id: number) {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this account?"
            );

        if (!confirmed) {

            return;

        }

        try {

            await accountService.delete(id);

            loadAccounts();

        } catch (error) {

            console.error(error);

        }

    }

    useEffect(() => {

        loadAccounts();

    }, []);

    return (

        <div className="flex min-h-screen bg-slate-100">

            <Sidebar />

            <div className="flex-1">

                <Navbar />

                <main className="p-8">

                    <h1 className="text-3xl font-bold text-slate-800">

                        Accounts

                    </h1>

                    <p className="mt-2 text-gray-500 mb-8">

                        Manage your accounts.

                    </p>

                    <AccountForm
                        onAccountCreated={loadAccounts}
                        editingAccount={editingAccount}
                    />

                    <div className="mt-8">

                        <AccountList
                            accounts={accounts}
                            setEditingAccount={setEditingAccount}
                            handleDelete={handleDelete}
                        />

                    </div>

                </main>

            </div>

        </div>

    );

}

export default AccountsPage;