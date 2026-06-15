import { api } from "../api/axios";

export const budgetService = {

    async getAll() {

        const response =
            await api.get(
                "/budgets"
            );

        return response.data;

    },

    async create(data: any) {

        const response =
            await api.post(
                "/budgets",
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
                `/budgets/${id}`,
                data
            );

        return response.data;

    },

    async delete(id: number) {

        await api.delete(
            `/budgets/${id}`
        );

    }

};