import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfileModule } from './profile/profile.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    CoreModule,
    AuthModule,
    UsersModule,
    ProfileModule,
    FilesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      renderPath: '/uploads',
      serveRoot: '/uploads',
    }),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
