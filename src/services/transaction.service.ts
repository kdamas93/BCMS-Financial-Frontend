import { api } from "../api/axios";

export const transactionService = {

    async getAll() {

        const response = await api.get(
            "/transactions"
        );

        return response.data;

    },

    async create(data: any) {

        const response = await api.post(
            "/transactions",
            data
        );

        return response.data;

    },

    async delete(id: number) {

        await api.delete(
            `/transactions/${id}`
        );

    },

    async update(id: number, data: any) {

        const response = await api.put(
            `/transactions/${id}`,
            data
        );
    
        return response.data;
    
    }

};