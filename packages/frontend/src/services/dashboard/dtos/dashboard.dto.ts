import { DashboardType } from "../enums/type.enum";

export interface CreateDashboardDto {
    title: string;
    description: string | null;
    iconId: number;
    type: DashboardType;
}