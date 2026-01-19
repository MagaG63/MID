import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CustomJwtPayload } from '../jwt.utils';
import { RequestWithUser } from '../guards/jwt-auth.guard';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): CustomJwtPayload => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    return request.user;
  },
);
