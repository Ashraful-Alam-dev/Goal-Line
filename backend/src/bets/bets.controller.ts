import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { BetsService } from './bets.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles, RolesGuard } from '../auth/roles.guard';
import { Role } from '@prisma/client';

@Controller('bets')
@UseGuards(JwtAuthGuard)
export class BetsController {
  constructor(
    private readonly betsService: BetsService,
  ) {}

  @Post()
  placeBet(
    @Request() req: any,
    @Body() body: any,
  ) {
    return this.betsService.placeBet(
      req.user.id,
      body,
    );
  }

  @Get('my')
  myBets(@Request() req: any) {
    return this.betsService.myBets(
      req.user.id,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  getAllBets() {
    return this.betsService.getAllBets();
  }
}