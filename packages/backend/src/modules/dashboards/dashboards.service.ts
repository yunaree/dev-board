import { BadRequestException, Injectable } from '@nestjs/common';
import { DashboardType } from '@prisma/client';
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

    async createDashboard(
        title: string,
        userId: number,
        type: DashboardType,
        iconId: number,
        description?: string,
    ): Promise<Dashboard> {
        const existing = await this.prismaService.dashboard.findUnique({
        where: { title },
        });

        if (existing) {
        throw new BadRequestException("Dashboard with this title already exists");
        }

        return this.prismaService.dashboard.create({
        data: {
            title,
            userId,
            type,
            iconId,
            description,
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

    async addTaskToDashboard(taskId: number, dashboardId: number, userId: number): Promise<{ success: boolean }> {
        const task = await this.prismaService.task.findUnique({
            where: { id: taskId },
        });

        if (!task) {
            throw new Error('Task not found');
        }

        if (task.createdBy !== userId) {
            throw new Error('You can only add your own tasks to dashboards');
        }

        const dashboard = await this.prismaService.dashboard.findUnique({
            where: { id: dashboardId },
        });

        if (!dashboard) {
            throw new Error('Dashboard not found');
        }

        await this.prismaService.task.update({
            where: { id: taskId },
            data: { dashboardId },
        });

        return { success: true };
    }

    async addUserToDashboard(dashboardId: number, username: string, userId: number): Promise<{ success: boolean }> {
        const dashboard = await this.prismaService.dashboard.findUnique({
            where: { id: dashboardId },
        });

        if (!dashboard) {
            throw new Error('Dashboard not found');
        }

        if (dashboard.userId !== userId) {
            throw new Error('You can only add users to your own dashboards');
        }

        console.log('Adding user to dashboard:', { dashboardId, username, userId });

        const user = await this.prismaService.user.findUnique({
            where: { username },
        });

        if (!user) {
            throw new Error('User not found');
        }

        await this.prismaService.dashboardMember.create({
            data: {
                dashboardId,
                userId: user.id,
            },
        });

        return { success: true };
    }

    async removeUserFromDashboard(dashboardId: number, username: string, userId: number): Promise<{ success: boolean }> {
        const dashboard = await this.prismaService.dashboard.findUnique({
            where: { id: dashboardId },
        });

        if (!dashboard) {
            throw new Error('Dashboard not found');
        }

        if (dashboard.userId !== userId) {
            throw new Error('You can only remove users from your own dashboards');
        }

        const user = await this.prismaService.user.findUnique({
            where: { username },
        });

        if (!user) {
            throw new Error('User not found');
        }

        await this.prismaService.dashboardMember.delete({
            where: {
            userId_dashboardId: {
                userId: user.id,
                dashboardId: dashboardId,
            },
            },
        });

        return { success: true };
    }


        async leaveDashboard(dashboardId: number, userId: number): Promise<{ success: boolean }> {
            const dashboard = await this.prismaService.dashboard.findUnique({
                where: { id: dashboardId },
            });

            if (!dashboard) {
                throw new Error('Dashboard not found');
            }

            if (dashboard.userId === userId) {
                throw new Error('You cannot leave your own dashboard');
            }

            await this.prismaService.dashboardMember.delete({
                where: {
                userId_dashboardId: {
                    userId,
                    dashboardId,
                },
                },
            });

            return { success: true };
        }


    async getDashboardUsers(dashboardId: number): Promise<{ users: { id: number, username: string }[] }> {
        const dashboard = await this.prismaService.dashboard.findUnique({
            where: { id: dashboardId },
            include: { members: true },
        });

        if (!dashboard) {
            throw new Error('Dashboard not found');
        }

        const usersId = dashboard.members.map(user => ({
            id: user.id
        }));

        const usernames = await this.prismaService.user.findMany({
            where: {
                id: {
                    in: usersId.map(user => user.id),
                },
            },
            select: {
                id: true,
                username: true,
            },
        });

        const users = usernames.map(user => ({
            id: user.id,
            username: user.username,
        }));

        return { users };
    }
}
