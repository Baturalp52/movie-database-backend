import { UserModel } from '../models/User.model';
import { UserAuthModel } from '../models/UserAuth.model';

export default () => {
  return {
    database: {
      dialect: process.env.DATABASE_DIALECT,
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      models: [UserModel, UserAuthModel],
      autoLoadModels: true,
      synchronize: true,
      sync: { alter: true, force: false, logging: false },
      define: {
        timestamps: true,
        paranoid: true,
        underscored: true,
      },
      dialectOptions: {
        useUTC: true,
        dateStrings: true,
        typeCast: true,
        timezone: '+00:00',
      },
      timezone: '+00:00',
      logQueryParameters: true,
    },
  };
};
