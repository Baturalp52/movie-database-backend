import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [CoreModule, AuthModule, UsersModule, ProfileModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
