import { Module } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { personsProviders } from './persons.provider';
import { PersonsController } from './persons.controller';

@Module({
  providers: [PersonsService, ...personsProviders],
  controllers: [PersonsController],
})
export class PersonsModule {}
