import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { GetUser } from '../auth/decorator/index';
import { JwtGuard } from '../auth/guard/index';
//auth guard connects jwt.strategy using key:'jwt'. So using this key authguard knows where to check validation
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('me')
  //we use custume decorator GetUser, instead of normal express decorator @Req() req:Request, which we created in decorator's folder
  getMe(@GetUser() user: User) {
    console.log(user);
    return user;
  }
}
