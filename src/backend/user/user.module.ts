import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userProviders } from './user.providers';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { LoggerModule } from '../logger/logger.module';

import { UserEntity } from './user.entity';

@Module({
  imports: [LoggerModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [...userProviders, UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
