import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { DashboardsService } from './dashboards.service';
import { JwtAuthGuard } from 'src/shared/guards/auth/auth.guard';
import { Dashboard } from 'src/shared/types/dashboard.type';
import { RequestWithUser } from 'src/shared/interfaces/request-with-user.type';
import { DashboardDto } from 'src/shared/dtos/dashboard.dto';
import { RenameDashboardDto } from 'src/shared/dtos/rename-dashboard.dto';
import { AddTaskToDashboardDto } from 'src/shared/dtos/add-task-to-dashboard.dto';
import { AddUserToDashboardDto } from 'src/shared/dtos/add-user-to-dashboard.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Dashboards')
@ApiBearerAuth()
@Controller('dashboards')
export class DashboardsController {
    constructor(private readonly dashboardsService: DashboardsService) { }

    @ApiOperation({ summary: 'Get all dashboards for current user' })
    @ApiResponse({ status: 200, description: 'List of dashboards', type: [DashboardDto] })
    @UseGuards(JwtAuthGuard)
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
    @UseGuards(JwtAuthGuard)
    @Post()
    async createDashboard(
    @Req() req: RequestWithUser,
    @Body() dashboardDto: DashboardDto,
    ): Promise<Dashboard> {
        const userId = req.user['sub'];

        return this.dashboardsService.createDashboard(
            dashboardDto.title,
            userId,
            dashboardDto.type,
            dashboardDto.iconId,
            dashboardDto.description,
        );
    }


    @ApiOperation({ summary: 'Delete dashboard by id' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Dashboard deleted' })
    @UseGuards(JwtAuthGuard)
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
    @ApiBody({ type: RenameDashboardDto })
    @ApiResponse({ status: 200, description: 'Dashboard renamed', type: DashboardDto })
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async renameDashboard(
        @Param('id') dashboardId: number,
        @Body() body: RenameDashboardDto,
        @Req() req: RequestWithUser
    ): Promise<Dashboard> {
        const userId = req.user['sub'];
        const newTitle = body.newTitle;
        return this.dashboardsService.renameDashboard(dashboardId, newTitle, userId);
    }

    @ApiOperation({ summary: 'Add task to dashboard' })
    @ApiParam({ name: 'id', type: Number })
    @ApiBody({ type: AddTaskToDashboardDto })
    @ApiResponse({ status: 200, description: 'Task added to dashboard' })
    @UseGuards(JwtAuthGuard)
    @Post(':id/tasks')
    async addTaskToDashboard(
        @Param('id') dashboardId: number,
        @Body() body: AddTaskToDashboardDto,
        @Req() req: RequestWithUser
    ): Promise<{ success: boolean }> {
        const userId = req.user['sub'];
        const taskId = body.taskId;
        return this.dashboardsService.addTaskToDashboard(taskId, dashboardId, userId);
    }

    @ApiOperation({ summary: 'Add user to dashboard' })
    @ApiParam({ name: 'id', type: Number })
    @ApiBody({ type: AddUserToDashboardDto })
    @ApiResponse({ status: 200, description: 'User added to dashboard' })
    @UseGuards(JwtAuthGuard)
    @Post(':id/users')
    async addUserToDashboard(
        @Param('id') dashboardId: number,
        @Body() body: AddUserToDashboardDto,
        @Req() req: RequestWithUser
    ): Promise<{ success: boolean }> {
        const userId = req.user['sub'];
        const username = body.username;
        return this.dashboardsService.addUserToDashboard(dashboardId, username, userId);
    }

    @ApiOperation({ summary: 'Remove user from dashboard' })
    @ApiParam({ name: 'id', type: Number })
    @ApiBody({ type: AddUserToDashboardDto })
    @ApiResponse({ status: 200, description: 'User removed from dashboard' })
    @UseGuards(JwtAuthGuard)
    @Delete(':id/users')
    async removeUserFromDashboard(
        @Param('id') dashboardId: number,
        @Body() body: AddUserToDashboardDto,
        @Req() req: RequestWithUser
    ): Promise<{ success: boolean }> {
        const userId = req.user['sub'];
        const username = body.username;
        return this.dashboardsService.removeUserFromDashboard(dashboardId, username, userId);
    }

    @ApiOperation({ summary: 'Leave dashboard' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Left dashboard' })
    @UseGuards(JwtAuthGuard)
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
    @UseGuards(JwtAuthGuard)
    @Get(':id/users')
    async getDashboardUsers(
        @Param('id') dashboardId: number
    ): Promise<{ users: { id: number, username: string }[] }> {
        return this.dashboardsService.getDashboardUsers(dashboardId);
    }
}
