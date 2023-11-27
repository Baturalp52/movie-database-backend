import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import configuration from './configuration/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    SequelizeModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return { ...configService.get('database') };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [],
  exports: [],
})
export class CoreModule {}
