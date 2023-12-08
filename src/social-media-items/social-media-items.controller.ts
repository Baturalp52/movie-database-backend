import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseValidator } from 'src/core/decorators/response-validator.decorator';
import { AuthenticatedUser } from 'src/core/decorators/user.decorator';
import { RequiredAuthGuard } from 'src/core/guards/required-auth.guard';
import { UserModel } from 'src/core/models/User.model';
import { SocialMediaItemsService } from './social-media-items.service';
import { PostSocialMediaItemRequestBodyDto } from './dto/post-social-media-item/request.dto';
import { PostSocialMediaItemResponseDto } from './dto/post-social-media-item/response.dto';
import { UserRoleGuard } from 'src/core/guards/user-role.guard';
import { UserRole } from 'src/core/enums/user-role.enum';
import { UserRoleMeta } from 'src/core/decorators/user-role-meta.decorator';
import { GetAllSocialMediaItemResponseDto } from './dto/get-all/response.dto';
import { GetSocialMediaItemRequestParamDto } from './dto/get-social-media-item/request.dto';
import { PutSocialMediaItemResponseDto } from './dto/put-social-media-item/response.dto';
import {
  PutSocialMediaItemRequestBodyDto,
  PutSocialMediaItemRequestParamDto,
} from './dto/put-social-media-item/request.dto';
import { DeleteSocialMediaItemRequestParamDto } from './dto/delete-social-media-item/request.dto';
import { DeleteSocialMediaItemResponseDto } from './dto/delete-social-media-item/response.dto';

@ApiTags('Social Media Items')
@Controller('social-media-items')
export class SocialMediaItemsController {
  constructor(
    private readonly socialMediaItemsService: SocialMediaItemsService,
  ) {}

  @Get('')
  @ApiOperation({ summary: 'Used to get all social media items.' })
  @ApiResponse({
    status: 200,
    type: GetAllSocialMediaItemResponseDto,
  })
  @ResponseValidator(GetAllSocialMediaItemResponseDto)
  getAllSocialMediaItem() {
    return this.socialMediaItemsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Used to get social media item.' })
  @ApiResponse({
    status: 200,
    type: GetAllSocialMediaItemResponseDto,
  })
  @ResponseValidator(GetAllSocialMediaItemResponseDto)
  getSocialMediaItem(@Param() param: GetSocialMediaItemRequestParamDto) {
    return this.socialMediaItemsService.findOne(param.id);
  }

  @Post('')
  @UserRoleMeta(UserRole.ADMIN)
  @UseGuards(UserRoleGuard)
  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @ApiOperation({ summary: 'Used to create social media item.' })
  @ApiResponse({
    status: 200,
    type: PostSocialMediaItemResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  @ResponseValidator(PostSocialMediaItemResponseDto)
  createSocialMediaItem(
    @AuthenticatedUser() user: UserModel,
    @Body() body: PostSocialMediaItemRequestBodyDto,
  ) {
    return this.socialMediaItemsService.create(user, body);
  }

  @Put(':id')
  @UserRoleMeta(UserRole.ADMIN)
  @ApiBearerAuth()
  @UseGuards(UserRoleGuard)
  @UseGuards(RequiredAuthGuard)
  @ApiOperation({ summary: 'Used to update social media item.' })
  @ApiResponse({
    status: 200,
    type: PutSocialMediaItemResponseDto,
  })
  @ResponseValidator(PutSocialMediaItemResponseDto)
  updateSocialMediaItem(
    @Param() param: PutSocialMediaItemRequestParamDto,
    @Body() body: PutSocialMediaItemRequestBodyDto,
  ) {
    return this.socialMediaItemsService.update(param.id, body);
  }

  @Delete(':id')
  @UserRoleMeta(UserRole.ADMIN)
  @ApiBearerAuth()
  @UseGuards(UserRoleGuard)
  @UseGuards(RequiredAuthGuard)
  @ApiOperation({ summary: 'Used to delete social media item.' })
  @ApiResponse({
    status: 200,
    type: DeleteSocialMediaItemResponseDto,
  })
  @ResponseValidator(DeleteSocialMediaItemResponseDto)
  deleteSocialMediaItem(@Param() param: DeleteSocialMediaItemRequestParamDto) {
    return this.socialMediaItemsService.delete(param.id);
  }
}
