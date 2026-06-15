import { useEffect, useState } from "react";

import { categoryService } from "../services/category.service";
import type { Category } from "../types/category";

interface Props {

    onCategoryCreated: () => void;

    editingCategory: Category | null;

    setEditingCategory:
        React.Dispatch<
            React.SetStateAction<Category | null>
        >;

}

function CategoryForm({

    onCategoryCreated,
    editingCategory,
    setEditingCategory

}: Props) {

    const [name, setName] =
        useState("");

    const [type, setType] =
        useState("EXPENSE");

    useEffect(() => {

        if (editingCategory) {

            setName(
                editingCategory.name
            );

            setType(
                editingCategory.type
            );

        }

    }, [editingCategory]);

    async function handleSubmit(
        e: React.FormEvent
    ) {

        e.preventDefault();

        try {

            const data = {

                name,
                type

            };

            if (editingCategory) {

                await categoryService.update(
                    editingCategory.id,
                    data
                );

            } else {

                await categoryService.create(
                    data
                );

            }

            setName("");

            setType(
                "EXPENSE"
            );

            setEditingCategory(
                null
            );

            onCategoryCreated();

        } catch (error) {

            console.error(error);

        }

    }

    return (

        <div className="bg-white p-6 rounded-2xl shadow-md">

            <h2 className="text-xl font-semibold text-slate-800 mb-6">

                {

                    editingCategory

                        ? "Edit Category"

                        : "Create Category"

                }

            </h2>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                <input
                    type="text"
                    placeholder="Category Name"
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

                    <option value="INCOME">

                        INCOME

                    </option>

                    <option value="EXPENSE">

                        EXPENSE

                    </option>

                </select>

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

export default CategoryForm;