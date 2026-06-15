import { api } from "../api/axios";

export const categoryService = {

    async getAll() {

        const response =
            await api.get("/categories");

        return response.data;

    },

    async create(data: any) {

        const response =
            await api.post(
                "/categories",
                data
            );

        return response.data;

    },

    async update(
        id: number,
        data: any
    ) {

        const response =
            await api.put(
                `/categories/${id}`,
                data
            );

        return response.data;

    },

    async delete(id: number) {

        await api.delete(
            `/categories/${id}`
        );

    }

};