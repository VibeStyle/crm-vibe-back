import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../auth.types';
import { ErrorCodes } from '../../common/statusCodes';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET_REFRESH,
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    // We can not get here without token in parameters
    const user = await this.authService.validateUserById(payload?.id);
    if (user) {
      return {
        id: user.id,
        roleId: user.roleId,
        exp: payload.exp,
        iat: payload.iat,
        sub: payload.sub,
      };
    }
    throw new ForbiddenException(ErrorCodes.Unauthorized);
  }
}
