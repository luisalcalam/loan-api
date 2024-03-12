import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { addDays, addHours } from 'date-fns';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

import config from 'src/config';
import { User } from '../users/entities/user.entity';
import { PayloadToken } from './interfaces/payload.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { SessionsService } from 'src/sessions/sessions.service';
import { CreateSessionDto } from 'src/sessions/dto/create-session.dto';
import { UserSession } from './interfaces/userSession';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private sessionsService: SessionsService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    const where = { email };
    const user = await this.usersService.findOneWhere(where);
    if (!user) throw new UnauthorizedException('Credentials are not valid');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid');

    const sessionId = uuid();
    const payload: PayloadToken = { id: user.id, role: user.role, sessionId };
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
    const newSession: CreateSessionDto = {
      id: sessionId,
      refreshToken: session.refreshToken.token,
      expiresIn: expirationRefresh,
    };
    this.sessionsService.create(newSession, user);
    return { user, session };
  }

  async refreshToken(user: UserSession) {
    const payload: PayloadToken = {
      id: user.id,
      role: user.role,
      sessionId: user.sessionId,
    };
    const expirationAccess = addHours(
      new Date(),
      Number(this.configService.jwt.jwtExpirationDate.replace('m', '')),
    );

    return {
      accessToken: {
        token: this.jwtService.sign(payload),
        expiresIn: expirationAccess,
        createtAt: new Date(),
      },
    };
  }

  async validateUser(id: string, sessionId: string): Promise<User> {
    let user: User;
    try {
      user = await this.usersService.findOne(id);
    } catch (error) {
      throw new UnauthorizedException('Token not valid');
    }

    try {
      await this.sessionsService.findOne(sessionId);
    } catch (error) {
      throw new UnauthorizedException('Session not valid');
    }

    if (!user.enabled)
      throw new UnauthorizedException('User is inactive, talk with an admin');

    return user;
  }

  logout(sessionId: string): Promise<boolean> {
    return this.sessionsService.remove(sessionId);
  }
}
