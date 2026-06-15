import { api } from "../api/axios";

export const dashboardService = {

    async getSummary() {

        const response = await api.get(
            "/dashboard/summary"
        );

        return response.data;

    }

};