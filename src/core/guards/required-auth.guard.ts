import { AuthGuard } from '@nestjs/passport';

export class RequiredAuthGuard extends AuthGuard('jwt') {}
