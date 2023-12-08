import { Module } from '@nestjs/common';
import { PersonTypesService } from './person-types.service';
import { personTypesProviders } from './person-types.provider';
import { PersonTypesController } from './person-types.controller';

@Module({
  providers: [PersonTypesService, ...personTypesProviders],
  controllers: [PersonTypesController],
})
export class PersonTypesModule {}
