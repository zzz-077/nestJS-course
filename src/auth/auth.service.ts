import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  signup() {
    return { msg: 'You are signedup!' };
  }
  signin() {
    return { msg: 'You are signedin!' };
  }
}
