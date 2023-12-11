import {
  Body,
  Controller,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseValidator } from 'src/core/decorators/response-validator.decorator';
import { AuthenticatedUser } from 'src/core/decorators/user.decorator';
import { RequiredAuthGuard } from 'src/core/guards/required-auth.guard';
import { UserModel } from 'src/core/models/User.model';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostFileRequestBodyDto } from './dto/post-file/request.dto';
import { PostFileResponseDto } from './dto/post-file/response.dto';
import { MulterStorage } from 'src/core/utils/multer-storage';
import { PHOTO_FOLDER_PATH } from './path.constant';

const ImageValidatorPipe = new ParseFilePipeBuilder()
  .addFileTypeValidator({
    fileType: /\/(jpg|jpeg|png|gif)$/,
  })
  .addMaxSizeValidator({
    maxSize: 10000000,
  })
  .build({
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  });

@ApiTags('Files')
@ApiBearerAuth()
@UseGuards(RequiredAuthGuard)
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('/users/profile')
  @ApiOperation({ summary: 'Used to upload user profile photo.' })
  @ApiResponse({
    status: 200,
    type: PostFileResponseDto,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: MulterStorage(PHOTO_FOLDER_PATH.USERS.PROFILE),
    }),
  )
  @ResponseValidator(PostFileResponseDto)
  uploadUserProfilePhoto(
    @AuthenticatedUser() user: UserModel,
    @Body() body: PostFileRequestBodyDto,
    @UploadedFile(ImageValidatorPipe)
    file: Express.Multer.File,
  ) {
    return this.filesService.create(
      user,
      file,
      PHOTO_FOLDER_PATH.USERS.PROFILE,
    );
  }

  @Post('/users/banner')
  @ApiOperation({ summary: 'Used to upload user banner photo.' })
  @ApiResponse({
    status: 200,
    type: PostFileResponseDto,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: MulterStorage(PHOTO_FOLDER_PATH.USERS.BANNER),
    }),
  )
  @ResponseValidator(PostFileResponseDto)
  uploadUserBannerPhoto(
    @AuthenticatedUser() user: UserModel,
    @Body() body: PostFileRequestBodyDto,
    @UploadedFile(ImageValidatorPipe)
    file: Express.Multer.File,
  ) {
    return this.filesService.create(user, file, PHOTO_FOLDER_PATH.USERS.BANNER);
  }

  @Post('/movies/banner')
  @ApiOperation({ summary: 'Used to upload movie banner photo.' })
  @ApiResponse({
    status: 200,
    type: PostFileResponseDto,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: MulterStorage(PHOTO_FOLDER_PATH.MOVIES.BANNER),
    }),
  )
  @ResponseValidator(PostFileResponseDto)
  uploadMovieBannerPhoto(
    @AuthenticatedUser() user: UserModel,
    @Body() body: PostFileRequestBodyDto,
    @UploadedFile(ImageValidatorPipe)
    file: Express.Multer.File,
  ) {
    return this.filesService.create(
      user,
      file,
      PHOTO_FOLDER_PATH.MOVIES.BANNER,
    );
  }
  @Post('/movies/poster')
  @ApiOperation({ summary: 'Used to upload movie poster photo.' })
  @ApiResponse({
    status: 200,
    type: PostFileResponseDto,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: MulterStorage(PHOTO_FOLDER_PATH.MOVIES.POSTER),
    }),
  )
  @ResponseValidator(PostFileResponseDto)
  uploadMoviePosterPhoto(
    @AuthenticatedUser() user: UserModel,
    @Body() body: PostFileRequestBodyDto,
    @UploadedFile(ImageValidatorPipe)
    file: Express.Multer.File,
  ) {
    return this.filesService.create(
      user,
      file,
      PHOTO_FOLDER_PATH.MOVIES.POSTER,
    );
  }
}
