import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { PostSocialMediaItemRequestBodyDto } from './dto/post-social-media-item/request.dto';
import { PutSocialMediaItemRequestBodyDto } from './dto/put-social-media-item/request.dto';
import {
  SOCIAL_MEDIA_ITEM_REPOSITORY,
  SocialMediaItemModel,
} from 'src/core/models/SocialMediaItem.model';

@Injectable()
export class SocialMediaItemsService {
  constructor(
    @Inject(SOCIAL_MEDIA_ITEM_REPOSITORY)
    private readonly socialMediaItemRepository: typeof SocialMediaItemModel,
  ) {}

  async findAll(): Promise<SocialMediaItemModel[]> {
    return await this.socialMediaItemRepository.findAll();
  }

  async findOne(id: number): Promise<SocialMediaItemModel> {
    const socialMediaItem = await this.socialMediaItemRepository.findOne({
      where: { id },
    });

    if (!socialMediaItem) {
      throw new NotFoundException('Social Media item not found!');
    }

    return socialMediaItem;
  }

  async create(
    user: any,
    body: PostSocialMediaItemRequestBodyDto,
  ): Promise<any> {
    await this.socialMediaItemRepository.create({ ...body });
    return;
  }

  async update(
    id: number,
    body: PutSocialMediaItemRequestBodyDto,
  ): Promise<any> {
    const socialMediaItem = await this.socialMediaItemRepository.findOne({
      where: { id },
    });

    if (!socialMediaItem) {
      throw new NotFoundException('Social Media item not found!');
    }

    await socialMediaItem.update(body);
    return;
  }

  async delete(id: number): Promise<any> {
    const socialMediaItem = await this.socialMediaItemRepository.findOne({
      where: { id },
    });

    if (!socialMediaItem) {
      throw new NotFoundException('Social Media Item not found!');
    }

    await socialMediaItem.destroy();
    return;
  }
}
