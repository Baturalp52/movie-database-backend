import { UserRole } from 'src/core/enums/user-role.enum';

export const usersBootstrapData = [
  {
    firstName: 'Admin',
    lastName: 'User',
    role: UserRole.ADMIN,
    auth: {
      username: 'admin',
      email: 'admin@admin.com',
      password: '$2b$10$8hCfxd3lRRgWav9GZObogOB81GxhvCG9yZi7bd86wOK0uY6r5IteS',
    },
  },
  {
    firstName: 'Editor',
    lastName: 'User',
    role: UserRole.EDITOR,
    auth: {
      username: 'editor',
      email: 'editor@editor.com',
      password: '$2b$10$8hCfxd3lRRgWav9GZObogOB81GxhvCG9yZi7bd86wOK0uY6r5IteS',
    },
  },
  {
    firstName: 'Normal',
    lastName: 'User',
    role: UserRole.USER,
    auth: {
      username: 'user',
      email: 'user@user.com',
      password: '$2b$10$8hCfxd3lRRgWav9GZObogOB81GxhvCG9yZi7bd86wOK0uY6r5IteS',
    },
  },
];
