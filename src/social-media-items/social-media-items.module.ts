import { Module } from '@nestjs/common';
import { SocialMediaItemsService } from './social-media-items.service';
import { socialMediaItemsProviders } from './social-media-items.provider';
import { SocialMediaItemsController } from './social-media-items.controller';

@Module({
  providers: [SocialMediaItemsService, ...socialMediaItemsProviders],
  controllers: [SocialMediaItemsController],
})
export class SocialMediaItemsModule {}
