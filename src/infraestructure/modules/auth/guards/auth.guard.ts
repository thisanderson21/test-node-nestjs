import { Injectable } from '@nestjs/common';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthCustomGuard extends NestAuthGuard('jwt') {}
