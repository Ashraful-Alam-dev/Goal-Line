import { Controller, Post, Get, Body, Request, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { FixturesService } from './fixtures.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard, Roles } from '../auth/roles.guard';

@Controller('fixtures')
export class FixturesController {
  constructor(private readonly fixturesService: FixturesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  create(@Body() body: any) {
    return this.fixturesService.create(body);
  }

  @Get()
  findAllOpen() {
    return this.fixturesService.findAllOpen();
  }

  @Get('history')
  getHistory() {
    return this.fixturesService.findSettled();
  }

  @Get('leaderboard')
  @UseGuards(JwtAuthGuard)
  getLeaderboard(@Request() req: any) {
    return this.fixturesService.getLeaderboard(
      req.user.id,
    );
  }
}