import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SummaryCard from "../components/SummaryCard";
import { transactionService } from "../services/transaction.service";
import RecentTransactions from "../components/RecentTransactions";
import type { Transaction } from "../types/transaction";
import SummaryChart from "../components/SummaryChart";

import { dashboardService } from "../services/dashboard.service";

import {
    BanknotesIcon,
    ArrowTrendingDownIcon,
    ScaleIcon
} from "@heroicons/react/24/outline";

interface Summary {
    totalIncome: number;
    totalExpense: number;
    balance: number;
}

function DashboardPage() {

    const [summary, setSummary] = useState<Summary>({
        totalIncome: 0,
        totalExpense: 0,
        balance: 0
    });

    const [transactions, setTransactions] = useState<Transaction[]>([]);


    useEffect(() => {

        const loadSummary = async () => {

            try {

                const summaryData = await dashboardService.getSummary();

                setSummary(summaryData);

                const transactionData = await transactionService.getAll();

                setTransactions(transactionData);

            } catch (error) {

                console.error(error);

            }

        };

        loadSummary();

    }, []);

    return (

        <div className="flex min-h-screen bg-slate-100">

            <Sidebar />

            <div className="flex-1">

                <Navbar />

                <main className="p-8">

                    <h1 className="text-3xl font-bold text-slate-800">
                        Welcome to BCMS Financial
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Manage your finances efficiently.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

                        <SummaryCard
                            title="Income"
                            value={summary.totalIncome}
                            color="text-emerald-600"
                            icon={
                                <BanknotesIcon
                                    className="h-12 w-12 text-emerald-500"
                                />
                            }
                        />

                        <SummaryCard
                            title="Expenses"
                            value={summary.totalExpense}
                            color="text-red-500"
                            icon={
                                <ArrowTrendingDownIcon
                                    className="h-12 w-12 text-red-500"
                                />
                            }
                        />

                        <SummaryCard
                            title="Balance"
                            value={summary.balance}
                            color="text-cyan-700"
                            icon={
                                <ScaleIcon
                                    className="h-12 w-12 text-cyan-700"
                                />
                            }
                        />

                    </div>
                    <SummaryChart
                        totalIncome={summary.totalIncome}
                        totalExpense={summary.totalExpense}
                        balance={summary.balance}
                    />
                    <RecentTransactions
                        transactions={transactions}
                    />

                </main>

            </div>

        </div>

    );

}

export default DashboardPage;