import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../enums/user-role.enum';

export const UserRoleMeta = (role: UserRole) => SetMetadata('role', role);
