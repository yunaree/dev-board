import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { DashboardsService } from './dashboards.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { Dashboard } from 'src/shared/types/dashboard.type';
import { RequestWithUser } from 'src/shared/interfaces/request-with-user.type';
import { DashboardDto } from 'src/shared/dtos/dashboard.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Dashboards')
@ApiBearerAuth()
@Controller('dashboards')
export class DashboardsController {
    constructor(private readonly dashboardsService: DashboardsService) { }

    @ApiOperation({ summary: 'Get all dashboards for current user' })
    @ApiResponse({ status: 200, description: 'List of dashboards', type: [DashboardDto] })
    @UseGuards(AuthGuard)
    @Get()
    async getDashboards(
        @Req() req: RequestWithUser
    ): Promise<Dashboard[]> {
        const userId = req.user['sub'];
        return this.dashboardsService.getDashboards(userId);
    }

    @ApiOperation({ summary: 'Create new dashboard' })
    @ApiBody({ type: DashboardDto })
    @ApiResponse({ status: 201, description: 'Dashboard created', type: DashboardDto })
    @UseGuards(AuthGuard)
    @Post()
    async createDashboard(
        @Req() req: RequestWithUser,
        @Body() dashboardDto: DashboardDto
    ): Promise<Dashboard> {
        const userId = req.user['sub'];
        return this.dashboardsService.createDashboard(dashboardDto.title, userId);
    }

    @ApiOperation({ summary: 'Delete dashboard by id' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Dashboard deleted' })
    @UseGuards(AuthGuard)
    @Delete(':id')
    async removeDashboard(
        @Param('id') dashboardId: number,
        @Req() req: RequestWithUser
    ): Promise<{ success: boolean }> {
        const userId = req.user['sub'];
        return this.dashboardsService.removeDashboard(dashboardId, userId);
    }

    @ApiOperation({ summary: 'Rename dashboard' })
    @ApiParam({ name: 'id', type: Number })
    @ApiBody({ schema: { properties: { newTitle: { type: 'string' } } } })
    @ApiResponse({ status: 200, description: 'Dashboard renamed', type: DashboardDto })
    @UseGuards(AuthGuard)
    @Patch(':id')
    async renameDashboard(
        @Param('id') dashboardId: number,
        @Body() body: { newTitle: string },
        @Req() req: RequestWithUser
    ): Promise<Dashboard> {
        const userId = req.user['sub'];
        const newTitle = body.newTitle;
        return this.dashboardsService.renameDashboard(dashboardId, newTitle, userId);
    }

    @ApiOperation({ summary: 'Add task to dashboard' })
    @ApiParam({ name: 'id', type: Number })
    @ApiBody({ schema: { properties: { taskId: { type: 'number' } } } })
    @ApiResponse({ status: 200, description: 'Task added to dashboard' })
    @UseGuards(AuthGuard)
    @Post(':id/tasks')
    async addTaskToDashboard(
        @Param('id') dashboardId: number,
        @Body() body: { taskId: number },
        @Req() req: RequestWithUser
    ): Promise<{ success: boolean }> {
        const userId = req.user['sub'];
        const taskId = body.taskId;
        return this.dashboardsService.addTaskToDashboard(taskId, dashboardId, userId);
    }

    @ApiOperation({ summary: 'Add user to dashboard' })
    @ApiParam({ name: 'id', type: Number })
    @ApiBody({ schema: { properties: { username: { type: 'string' } } } })
    @ApiResponse({ status: 200, description: 'User added to dashboard' })
    @UseGuards(AuthGuard)
    @Post(':id/users')
    async addUserToDashboard(
        @Param('id') dashboardId: number,
        @Body() body: { username: string },
        @Req() req: RequestWithUser
    ): Promise<{ success: boolean }> {
        const userId = req.user['sub'];
        const username = body.username;
        return this.dashboardsService.addUserToDashboard(dashboardId, username, userId);
    }

    @ApiOperation({ summary: 'Remove user from dashboard' })
    @ApiParam({ name: 'id', type: Number })
    @ApiBody({ schema: { properties: { username: { type: 'string' } } } })
    @ApiResponse({ status: 200, description: 'User removed from dashboard' })
    @UseGuards(AuthGuard)
    @Delete(':id/users')
    async removeUserFromDashboard(
        @Param('id') dashboardId: number,
        @Body() body: { username: string },
        @Req() req: RequestWithUser
    ): Promise<{ success: boolean }> {
        const userId = req.user['sub'];
        const username = body.username;
        return this.dashboardsService.removeUserFromDashboard(dashboardId, username, userId);
    }

    @ApiOperation({ summary: 'Leave dashboard' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Left dashboard' })
    @UseGuards(AuthGuard)
    @Post(':id/leave')
    async leaveDashboard(
        @Param('id') dashboardId: number,
        @Req() req: RequestWithUser
    ): Promise<{ success: boolean }> {
        const userId = req.user['sub'];
        return this.dashboardsService.leaveDashboard(dashboardId, userId);
    }

    @ApiOperation({ summary: 'Get users of dashboard' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'List of users', schema: { example: { users: [{ id: 1, username: 'user' }] } } })
    @UseGuards(AuthGuard)
    @Get(':id/users')
    async getDashboardUsers(
        @Param('id') dashboardId: number
    ): Promise<{ users: { id: number, username: string }[] }> {
        return this.dashboardsService.getDashboardUsers(dashboardId);
    }
}
