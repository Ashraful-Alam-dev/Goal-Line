import { Module } from '@nestjs/common';
import { FixturesController } from './fixtures.controller';
import { FixturesService } from './fixtures.service';
import { SettlementController } from './settlement.controller';
import { RolesGuard } from '../auth/roles.guard';

@Module({
  controllers: [
    FixturesController,
    SettlementController,
  ],
  providers: [
    FixturesService,
    RolesGuard,
  ],
})
export class FixturesModule {}