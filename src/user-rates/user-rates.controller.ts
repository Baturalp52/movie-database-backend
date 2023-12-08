import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseValidator } from 'src/core/decorators/response-validator.decorator';
import { RequiredAuthGuard } from 'src/core/guards/required-auth.guard';
import { UserRatesService } from './user-rates.service';
import { PutUserResponseDto } from './dto/get-user-rates/response.dto';
import { AuthenticatedUser } from 'src/core/decorators/user.decorator';
import { UserModel } from 'src/core/models/User.model';
import { GetUserRatesRequestQueryDto } from './dto/get-user-rates/request.dto';

@ApiTags('User Rates')
@ApiBearerAuth()
@UseGuards(RequiredAuthGuard)
@Controller('user-rates')
export class UserRatesController {
  constructor(private readonly userRatesService: UserRatesService) {}

  @Get('')
  @ApiOperation({ summary: 'Used to get user rates.' })
  @ApiResponse({
    status: 200,
    type: PutUserResponseDto,
  })
  @ResponseValidator(PutUserResponseDto)
  getRates(
    @AuthenticatedUser() user: UserModel,
    @Query() query: GetUserRatesRequestQueryDto,
  ) {
    return this.userRatesService.findAll(user, query);
  }
}
