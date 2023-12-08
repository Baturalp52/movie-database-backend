import { Module } from '@nestjs/common';
import { UserRatesService } from './user-rates.service';
import { userRatesProviders } from './user-rates.provider';
import { UserRatesController } from './user-rates.controller';

@Module({
  controllers: [UserRatesController],
  providers: [UserRatesService, ...userRatesProviders],
  exports: [UserRatesService],
})
export class UserRatesModule {}
