import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { addDays, addHours } from 'date-fns';

import config from 'src/config';
import { User } from '../users/entities/user.entity';
import { PayloadToken } from './interfaces/payload.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    const where = { email };
    const user = await this.usersService.findOneWhere(where);
    if (!user) throw new UnauthorizedException('Credentials are not valid');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid');

    const payload: PayloadToken = { id: user.id, role: user.role };
    const expirationAccess = addHours(
      new Date(),
      Number(this.configService.jwt.jwtExpirationDate.replace('m', '')),
    );
    const expirationRefresh = addDays(
      new Date(),
      Number(this.configService.jwt.refreshJwtExpirationDate.replace('d', '')),
    );
    const session = {
      accessToken: {
        token: this.jwtService.sign(payload),
        expiresIn: expirationAccess,
        createtAt: new Date(),
      },
      refreshToken: {
        token: this.jwtService.sign(payload, {
          secret: this.configService.jwt.refreshSecretJwt,
          expiresIn: this.configService.jwt.refreshJwtExpirationDate,
        }),
        expiresIn: expirationRefresh,
        createtAt: new Date(),
      },
    };
    return { user, session };
  }

  async validateUser(id: string): Promise<User> {
    let user: User;
    try {
      user = await this.usersService.findOne(id);
    } catch (error) {
      throw new UnauthorizedException('Token not valid');
    }

    if (!user.enabled)
      throw new UnauthorizedException('User is inactive, talk with an admin');

    return user;
  }
}
