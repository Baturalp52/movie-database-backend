import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { UsersModule } from 'src/users/users.module';
import { profileProviders } from './profile.providers';

@Module({
  imports: [UsersModule],
  controllers: [ProfileController],
  providers: [ProfileService, ...profileProviders],
})
export class ProfileModule {}
