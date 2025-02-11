import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserRoleBindingEntity } from 'src/modules/user_role_binding/entities';

export const GetUserRoleBinding = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    // const ctx = GqlExecutionContext.create(context);
    const req: Request & {
      userRoleBinding: UserRoleBindingEntity;
    } = ctx.switchToHttp().getRequest();
    return req.userRoleBinding;
  },
);
