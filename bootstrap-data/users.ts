import { UserRole } from 'src/core/enums/user-role.enum';

export const usersBootstrapData = [
  {
    firstName: 'Admin',
    lastName: 'User',
    role: UserRole.ADMIN,
    auth: {
      username: 'admin',
      email: 'admin@admin.com',
      password: '123456Ab',
    },
  },
  {
    firstName: 'Editor',
    lastName: 'User',
    role: UserRole.EDITOR,
    auth: {
      username: 'editor',
      email: 'editor@editor.com',
      password: '123456Ab',
    },
  },
  {
    firstName: 'Normal',
    lastName: 'User',
    role: UserRole.EDITOR,
    auth: {
      username: 'user',
      email: 'user@user.com',
      password: '123456Ab',
    },
  },
];
