import { api } from "@/lib/api";
import { useAuthStore } from "@/store/auth.store";
import { CreateDashboardDto } from "./dtos/dashboard.dto";

export const createDashboard = async (data: CreateDashboardDto) => {
    const token = useAuthStore.getState().tokens?.access_token;

    const res = await api.post<void>('/dashboards', data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
}