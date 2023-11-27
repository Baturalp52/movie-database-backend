import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginRequestBodyDto } from './dto/login/request.dto';
import { AuthRegisterRequestBodyDto } from './dto/register/request.dto';
import { ResponseValidator } from 'src/core/decorators/response-validator.decorator';
import { AuthRegisterResponseDto } from './dto/register/response.dto';
import { AuthLoginResponseDto } from './dto/login/response.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ResponseValidator(AuthLoginResponseDto)
  @ApiOperation({ summary: 'Used to login.' })
  @ApiResponse({
    status: 200,
    type: AuthLoginResponseDto,
    description: 'Login success',
  })
  async login(@Body() body: AuthLoginRequestBodyDto) {
    return await this.authService.login(body);
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Used to register.' })
  @ApiResponse({
    status: 200,
    type: AuthRegisterResponseDto,
    description: 'Registration success',
  })
  @ResponseValidator(AuthRegisterResponseDto)
  async register(@Body() body: AuthRegisterRequestBodyDto) {
    return await this.authService.register(body);
  }
}
