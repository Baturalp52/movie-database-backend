import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRegisterRequestBodyDto } from './dto/register/request.dto';
import { AuthLoginRequestBodyDto } from './dto/login/request.dto';
import { CustomException } from 'src/core/exceptions/custom.exception';
import { UsersService } from 'src/users/users.service';
import { JwtPayloadInterface } from 'src/core/interfaces/jwt-payload.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}
  async login(body: AuthLoginRequestBodyDto) {
    const user = await this.usersService.findByUserForLogin(body.email);
    if (!user) {
      throw new CustomException(
        'This account doesn’t exist. We recently updated to a new platform. Please create a new account to login',
      );
    }

    try {
      await user.auth.comparePassword(body.password);
    } catch (e) {
      throw new BadRequestException('Email address or password is incorrect');
    }

    return { token: await this.createAccessToken(user.id) };
  }

  async register(body: AuthRegisterRequestBodyDto) {
    const foundedUser = await this.usersService.findByUserForLogin(body.email);

    if (foundedUser) {
      throw new Error('User already exists');
    }

    const createdUser = await this.usersService.create(body);

    return {
      token: await this.createAccessToken(createdUser.id),
    };
  }

  public async validate(payload: JwtPayloadInterface) {
    const user = await this.usersService.findByIdForValidate(payload.userId);

    if (!user) {
      return null;
    }
    return user;
  }

  async createAccessToken(
    userId: number,
    expiresIn: number = +this.configService.get('JWT_EXPIRATION'),
  ) {
    const jwtPayload: JwtPayloadInterface = { userId: userId.toString() };
    const accessToken = this.jwtService.sign(jwtPayload, { expiresIn });
    return accessToken;
  }
}
