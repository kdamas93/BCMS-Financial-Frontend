import type { Category } from "../types/category";

import {

    PencilSquareIcon,
    TrashIcon

} from "@heroicons/react/24/outline";

interface Props {

    categories: Category[];

    setEditingCategory:
        (category: Category) => void;

    handleDelete:
        (id: number) => void;

}

function CategoryList({

    categories,
    setEditingCategory,
    handleDelete

}: Props) {

    return (

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">

            {

                categories.map((category) => (

                    <div
                        key={category.id}
                        className="flex justify-between items-center p-6 border-b border-slate-100 hover:bg-slate-50 transition"
                    >

                        <div>

                            <h3 className="font-semibold text-slate-800 text-lg">

                                {

                                    category.name

                                }

                            </h3>

                            <p className="text-sm text-slate-500">

                                {

                                    category.type

                                }

                            </p>

                        </div>

                        <div className="flex items-center gap-4">

                            <button
                                onClick={() =>
                                    setEditingCategory(
                                        category
                                    )
                                }
                                className="flex items-center gap-1 text-slate-500 hover:text-slate-700"
                            >

                                <PencilSquareIcon className="h-5 w-5" />

                                Edit

                            </button>

                            <button
                                onClick={() =>
                                    handleDelete(
                                        category.id
                                    )
                                }
                                className="flex items-center gap-1 text-red-500 hover:text-red-700"
                            >

                                <TrashIcon className="h-5 w-5" />

                                Delete

                            </button>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}

export default CategoryList;