import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Dashboard } from 'src/shared/types/dashboard.type';

@Injectable()
export class DashboardsService {
    constructor(private prismaService: PrismaService){}
    
    async getDashboards(userId: number): Promise<Dashboard[]>{
        const dashboards = await this.prismaService.dashboard.findMany({
            where: {
                userId,
            },
        });

        return dashboards ?? [];
    }

    async createDashboard(title: string, userId: number): Promise<Dashboard> {
        return this.prismaService.dashboard.create({
            data: {
                title,
                userId,
            },
        });
    }

    async removeDashboard(dashboardId: number, userId: number): Promise<{ success: boolean }> {
        const dashboard = await this.prismaService.dashboard.findUnique({
            where: {
                id: dashboardId,
            },
        });

        if (!dashboard) {
            throw new Error('Dashboard not found');
        }

        if (dashboard.userId !== userId) {
            throw new Error('You can only delete your own dashboards');
        }

        await this.prismaService.dashboard.delete({
            where: { id: dashboardId },
        });

        return { success: true };
    }

    async renameDashboard(dashboardId: number, newTitle: string, userId: number): Promise<Dashboard> {
        const dashboard = await this.prismaService.dashboard.findUnique({
            where: {
                id: dashboardId,
            },
        });

        if (!dashboard) {
            throw new Error('Dashboard not found');
        }

        if (dashboard.userId !== userId) {
            throw new Error('You can only rename your own dashboards');
        }

        return this.prismaService.dashboard.update({
            where: { id: dashboardId },
            data: { title: newTitle },
        });
    }   
}
