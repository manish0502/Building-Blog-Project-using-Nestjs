import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

//--------alternative------------------------------------------------

// "use strict";

// import {AuthGuard as NestAuthGuard} from "@nestjs/passport";

// export const AuthGuard = NestAuthGuard("jwt");
