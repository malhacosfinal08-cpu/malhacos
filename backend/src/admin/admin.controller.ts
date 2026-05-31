import { Controller, Get, Post, Param, UseGuards, Request } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('dashboard')
  async getDashboard(@Request() req) {
    // Verificar se é admin
    if (!req.user.isAdmin) {
      return { error: 'Acesso negado' };
    }
    return this.adminService.getDashboard();
  }

  @Post('block-user/:userId')
  async blockUser(@Param('userId') userId: string, @Request() req) {
    if (!req.user.isAdmin) return { error: 'Acesso negado' };
    return this.adminService.blockUser(userId);
  }

  @Post('verify-church/:churchId')
  async verifyChurch(@Param('churchId') churchId: string, @Request() req) {
    if (!req.user.isAdmin) return { error: 'Acesso negado' };
    return this.adminService.verifyChurch(churchId);
  }

  @Post('delete-post/:postId')
  async deletePost(@Param('postId') postId: string, @Request() req) {
    if (!req.user.isAdmin) return { error: 'Acesso negado' };
    return this.adminService.deletePost(postId);
  }

  @Get('reports')
  async getReports(@Request() req) {
    if (!req.user.isAdmin) return { error: 'Acesso negado' };
    return this.adminService.getReports();
  }
}
