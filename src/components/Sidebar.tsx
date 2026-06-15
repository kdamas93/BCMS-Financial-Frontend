import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Sidebar() {

    const { logout } = useAuth();
    const navigate = useNavigate();


    return (

        <aside className="w-64 bg-[#1e293b] text-white flex flex-col">

            <div className="p-6 border-b border-slate-700">

                <h1 className="text-2xl font-bold">

                    BCMS Financial

                </h1>

            </div>

            <nav className="flex-1 p-4 space-y-3">

                <Link
                    to="/dashboard"
                    className="block hover:text-blue-400"
                >
                    Dashboard
                </Link>

                <Link
                    to="/accounts"
                    className="block hover:text-blue-400"
                >
                    Accounts
                </Link>

                <Link
                    to="/categories"
                    className="block hover:text-blue-400"
                >
                    Categories
                </Link>

                <Link
                    to="/transactions"
                    className="block hover:text-blue-400"
                >
                    Transactions
                </Link>

                <Link
                    to="/budgets"
                    className="block hover:text-blue-400"
                >
                    Budgets
                </Link>

            </nav>

            <div className="p-4">

                <button
                    onClick={() => {
                        console.log("CLICK");
                        logout();
                        console.log("TOKEN ELIMINADO");
                        navigate("/");
                    }}
                    className="w-full bg-red-600 hover:bg-red-700 py-2 rounded"
                >
                    Logout
                </button>

            </div>

        </aside>

    );

}

export default Sidebar;