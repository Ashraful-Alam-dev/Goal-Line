import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { FixturesModule } from './fixtures/fixtures.module';
import { BetsModule } from './bets/bets.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    FixturesModule,
    BetsModule,
  ],
})
export class AppModule {}