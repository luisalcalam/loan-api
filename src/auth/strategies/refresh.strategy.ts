import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import config from 'src/config';
import { AuthService } from '../auth.service';
import { PayloadToken } from '../interfaces/payload.interface';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    @Inject(config.KEY) configService: ConfigType<typeof config>,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('refresh-token'),
      ignoreExpiration: false,
      secretOrKey: configService.jwt.refreshSecretJwt,
    });
  }

  async validate(payload: PayloadToken) {
    const user = await this.authService.validateUser(
      payload.id,
      payload.sessionId,
    );
    return { ...user };
  }
}
