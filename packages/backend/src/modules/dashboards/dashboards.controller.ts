import { Body, Controller, Delete, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { DashboardsService } from './dashboards.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { Dashboard } from 'src/shared/types/dashboard.type';
import { RequestWithUser } from 'src/shared/interfaces/request-with-user.type';
import { DashboardDto } from 'src/shared/dtos/dashboard.dto';

@Controller('dashboards')
export class DashboardsController {
    constructor(private readonly dashboardsService: DashboardsService) {}

    @UseGuards(AuthGuard)
    @Get('get-dashboards')
    async getDashboards(
        @Req() req: RequestWithUser
    ): Promise<Dashboard[]>{
        const userId = req.user['sub'];
        return this.dashboardsService.getDashboards(userId);
    }

    @UseGuards(AuthGuard)
    @Post('create-dashboard')
    async createDashboard(
        @Req() req: RequestWithUser,
        @Body() dashboardDto: DashboardDto
    ): Promise<Dashboard> {
        const userId = req.user['sub'];
        return this.dashboardsService.createDashboard(dashboardDto.title, userId);
    }

    @UseGuards(AuthGuard)
    @Delete('remove-dashboard')
    async removeDashboard(
        @Body() body: { dashboardId: number },
        @Req() req: RequestWithUser
    ): Promise<{ success: boolean }> {
        const userId = req.user['sub'];
        const dashboardId = body.dashboardId;
        return this.dashboardsService.removeDashboard(dashboardId, userId);
    }

    @UseGuards(AuthGuard)
    @Patch('rename-dashboard')
    async renameDashboard(
        @Body() body: { dashboardId: number, newTitle: string },
        @Req() req: RequestWithUser
    ): Promise<Dashboard> {
        const userId = req.user['sub'];
        const dashboardId = body.dashboardId;
        const newTitle = body.newTitle;
        return this.dashboardsService.renameDashboard(dashboardId, newTitle, userId);
    }

    @UseGuards(AuthGuard)
    @Post('add-task-to-dashboard')
    async addTaskToDashboard(
        @Body() body: { taskId: number, dashboardId: number },  
        @Req() req: RequestWithUser
    ): Promise<{ success: boolean }> {
        const userId = req.user['sub'];
        const taskId = body.taskId;
        const dashboardId = body.dashboardId;
        return this.dashboardsService.addTaskToDashboard(taskId, dashboardId, userId);
    }

    @UseGuards(AuthGuard)
    @Post('add-user-to-dashboard')
    async addUserToDashboard(
        @Body() body: { dashboardId: number, username: string },
        @Req() req: RequestWithUser
    ): Promise<{ success: boolean }> { 
        const userId = req.user['sub'];
        const dashboardId = body.dashboardId;
        const username = body.username;
        return this.dashboardsService.addUserToDashboard(dashboardId, username, userId);
    }

    @UseGuards(AuthGuard)
    @Post('remove-user-from-dashboard')
    async removeUserFromDashboard(
        @Body() body: { dashboardId: number, username: string },
        @Req() req: RequestWithUser
    ): Promise<{ success: boolean }> {
        const userId = req.user['sub'];
        const dashboardId = body.dashboardId;
        const username = body.username;
        return this.dashboardsService.removeUserFromDashboard(dashboardId, username, userId);
    }

    @UseGuards(AuthGuard)
    @Post('leave-dashboard')
    async leaveDashboard(
        @Body() body: { dashboardId: number },
        @Req() req: RequestWithUser
    ): Promise<{ success: boolean }> {
        const userId = req.user['sub'];
        const dashboardId = body.dashboardId;
        return this.dashboardsService.leaveDashboard(dashboardId, userId);
    }

    @UseGuards(AuthGuard)
    @Get('get-dashboard-users')
    async getDashboardUsers(
        @Body() body: { dashboardId: number }
    ): Promise<{ users: { id: number, username: string }[] }> {
        const dashboardId = body.dashboardId;
        return this.dashboardsService.getDashboardUsers(dashboardId);
    }
}
