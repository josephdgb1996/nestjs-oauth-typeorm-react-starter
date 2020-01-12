import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { GithubStrategy, GoogleStrategy } from './strategies';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [UserModule, PassportModule.register({ session: true })],
  providers: [GoogleStrategy, GithubStrategy, SessionSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
