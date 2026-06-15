import type { Account } from "./account";
import type { Category } from "./category";

export interface Transaction {

    id: number;

    amount: string;

    description: string;

    date: string;

    type: "INCOME" | "EXPENSE";

    accountId: number;

    categoryId: number;

    category: Category;

    account: Account;

}