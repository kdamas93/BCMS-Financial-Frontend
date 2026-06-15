import { api } from "../api/axios";

export const accountService = {

    async getAll() {

        const response = await api.get(
            "/accounts"
        );

        return response.data;

    },

    async create(data: any) {

        const response = await api.post(
            "/accounts",
            data
        );

        return response.data;

    },

    async delete(id: number) {

        await api.delete(
            `/accounts/${id}`
        );

    },

    async update(id: number, data: any) {

        const response = await api.put(
            `/accounts/${id}`,
            data
        );

        return response.data;

    }

};