import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
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

  @Post('/profile-photo')
  @ApiOperation({ summary: 'Used to upload profile image.' })
  @ApiResponse({
    status: 200,
    type: PostFileResponseDto,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: MulterStorage('profile-photos'),
    }),
  )
  @ResponseValidator(PostFileResponseDto)
  create(
    @AuthenticatedUser() user: UserModel,
    @Body() body: PostFileRequestBodyDto,
    @UploadedFile(ImageValidatorPipe)
    file: Express.Multer.File,
  ) {
    return this.filesService.create(user, file);
  }
}
