import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRegisterRequestBodyDto } from './dto/register/request.dto';
import { AuthLoginRequestBodyDto } from './dto/login/request.dto';
import { UsersService } from 'src/users/users.service';
import { JwtPayloadInterface } from 'src/core/interfaces/jwt-payload.interface';
import { ConfigService } from '@nestjs/config';
import { CustomException } from 'src/core/exceptions/custom.exception';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}
  async login(body: AuthLoginRequestBodyDto) {
    const userByEmail = await this.usersService.findByEmail(
      body.emailOrUsername,
    );
    let user = userByEmail;

    const userByUsername = await this.usersService.findByUsername(
      body.emailOrUsername,
    );

    if (userByUsername) user = userByUsername;

    if (!userByEmail && !userByUsername) {
      throw new BadRequestException('This account doesn’t exist');
    }

    try {
      await user.auth.comparePassword(body.password);
    } catch (e) {
      throw new BadRequestException('Email address or password is incorrect');
    }

    return { token: await this.createAccessToken(user.id) };
  }

  async register(body: AuthRegisterRequestBodyDto) {
    const foundedUserByEmail = await this.usersService.findByEmail(body.email);

    if (foundedUserByEmail) {
      throw new CustomException('E-mail is already in use');
    }

    const foundedUserByUsername = await this.usersService.findByUsername(
      body.username,
    );

    if (foundedUserByUsername) {
      throw new CustomException('Username is already in use');
    }

    const createdUser = await this.usersService.create(body);

    return {
      token: await this.createAccessToken(createdUser.id),
    };
  }

  public async validate(payload: JwtPayloadInterface) {
    const user = await this.usersService.findById(+payload.userId);

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
