import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { authService } from "../services/auth.service";
import { useAuth } from "../hooks/useAuth";

function RegisterPage() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        try {

            const response =
                await authService.register(
                    name,
                    email,
                    password
                );

            login(response.token);

            navigate("/dashboard");

        } catch (error) {

            console.error(error);

            alert("No fue posible crear la cuenta");

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800">

            <div className="bg-white w-96 p-8 rounded-2xl shadow-2xl">

                <div className="mb-8 text-center">

                    <h1 className="text-4xl font-bold text-slate-800">

                        BCMS Financial

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Comienza a administrar tus finanzas

                    </p>

                </div>

                <form
                    className="space-y-5"
                    onSubmit={handleSubmit}
                >

                    <div>

                        <label className="block mb-2 text-slate-700">

                            Nombre

                        </label>

                        <input
                            type="text"
                            placeholder="Ingresa tu nombre"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={name}
                            onChange={(e) =>
                                setName(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>

                    <div>

                        <label className="block mb-2 text-slate-700">

                            Email

                        </label>

                        <input
                            type="email"
                            placeholder="Ingresa tu email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>

                    <div>

                        <label className="block mb-2 text-slate-700">

                            Password

                        </label>

                        <input
                            type="password"
                            placeholder="Ingresa tu contraseña"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >

                        Crear cuenta

                    </button>

                </form>

                <div className="mt-6 text-center">

                    <p className="text-gray-500">

                        ¿Ya tienes una cuenta?

                    </p>

                    <Link
                        to="/"
                        className="text-blue-600 font-semibold hover:text-blue-800 transition"
                    >

                        Iniciar sesión

                    </Link>

                </div>

            </div>

        </div>

    );

}

export default RegisterPage;