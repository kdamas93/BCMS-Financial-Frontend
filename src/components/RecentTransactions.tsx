import type { Transaction } from "../types/transaction";

interface Props {

    transactions: Transaction[];

}

function RecentTransactions({
    transactions
}: Props) {

    return (

        <div className="bg-white rounded-2xl shadow-md p-6 mt-8">

            <h2 className="text-xl font-bold mb-6">

                Recent Transactions

            </h2>

            <div className="space-y-4">

                {
                    transactions.map((transaction) => (

                        <div
                            key={transaction.id}
                            className="flex justify-between border-b pb-3"
                        >

                            <span>

                                {transaction.description}

                            </span>

                            <span
                                className={
                                    transaction.type === "INCOME"
                                        ? "text-emerald-600 font-bold"
                                        : "text-red-500 font-bold"
                                }
                            >

                                {transaction.type === "INCOME"
                                    ? "+"
                                    : "-"}

                                ${transaction.amount}

                            </span>

                        </div>

                    ))
                }

            </div>

        </div>

    );

}

export default RecentTransactions;