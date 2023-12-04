import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SequelizeOptionsFactory,
  SequelizeModuleOptions,
} from '@nestjs/sequelize';
import { User } from 'src/users/users.model';

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createSequelizeOptions(): SequelizeModuleOptions {
    try {
      const {
        sql: { dialect, host, port, username, password, database },
      } = this.configService.get('database');

      return {
        dialect,
        logging: console.error,
        host,
        port,
        username,
        password,
        database,
        models: [User],
        autoLoadModels: true,
        define: {
          charset: 'utf8',
          collate: 'utf8_general_cli',
        },
      };
    } catch (error) {
      console.log(error);
    }
  }
}
