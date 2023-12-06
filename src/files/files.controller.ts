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
import { GetFileRequestParamDto } from './dto/get-file/request.dto';
import { GetFileResponseDto } from './dto/get-file/response.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostFileRequestBodyDto } from './dto/post-file/request.dto';
import { PostFileResponseDto } from './dto/post-file/response.dto';
import { join } from 'path';
import { UPLOAD_DIR } from 'src/core/constants/upload-dir.constant';

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
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Used to get file.' })
  @ApiResponse({
    status: 200,
    type: GetFileResponseDto,
  })
  @ResponseValidator(GetFileResponseDto)
  findOne(@Param() param: GetFileRequestParamDto) {
    return this.filesService.findOne(param.id);
  }

  @Post('/profile-photo')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Used to upload profile image.' })
  @ApiResponse({
    status: 200,
    type: PostFileResponseDto,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: join(UPLOAD_DIR, 'profile-photos'),
    }),
  )
  @ResponseValidator(PostFileResponseDto)
  @UseGuards(RequiredAuthGuard)
  create(
    @AuthenticatedUser() user: UserModel,
    @Body() body: PostFileRequestBodyDto,
    @UploadedFile(ImageValidatorPipe)
    file: Express.Multer.File,
  ) {
    return this.filesService.create(user, file);
  }
}
