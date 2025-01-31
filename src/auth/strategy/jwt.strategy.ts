import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    const jwtSecret = config.get('JWT_SECRET');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: { sub: number; email: string }) {
    //find user in db. if such user doesnot exsists it returns null and will be 401 unauthorized error
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });
    if (user) {
      const { hash, ...restFields } = user;
      return restFields;
    }
  }
}
