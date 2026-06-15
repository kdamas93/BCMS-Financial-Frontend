import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import CategoryForm from "../components/CategoryForm";
import CategoryList from "../components/CategoryList";

import type { Category } from "../types/category";
import { categoryService } from "../services/category.service";

function CategoriesPage() {

    const [categories, setCategories] =
        useState<Category[]>([]);

    const [editingCategory, setEditingCategory] =
        useState<Category | null>(null);

    async function loadCategories() {

        try {

            const data =
                await categoryService.getAll();

            setCategories(data);

        } catch (error) {

            console.error(error);

        }

    }

    async function handleDelete(id: number) {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this category?"
            );

        if (!confirmed) {

            return;

        }

        try {

            await categoryService.delete(id);

            loadCategories();

        } catch (error) {

            console.error(error);

        }

    }

    useEffect(() => {

        loadCategories();

    }, []);

    return (

        <div className="flex min-h-screen bg-slate-100">

            <Sidebar />

            <div className="flex-1">

                <Navbar />

                <main className="p-8">

                    <h1 className="text-3xl font-bold text-slate-800">

                        Categories

                    </h1>

                    <p className="mt-2 text-gray-500 mb-8">

                        Manage your categories.

                    </p>

                    <CategoryForm
                        onCategoryCreated={loadCategories}
                        editingCategory={editingCategory}
                        setEditingCategory={setEditingCategory}
                    />

                    <div className="mt-8">

                        <CategoryList
                            categories={categories}
                            setEditingCategory={setEditingCategory}
                            handleDelete={handleDelete}
                        />

                    </div>

                </main>

            </div>

        </div>

    );

}

export default CategoriesPage;