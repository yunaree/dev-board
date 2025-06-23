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
}
