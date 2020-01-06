import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { GoogleGuard, GithubGuard } from '../common/guards';
import { UserEntity } from '../users/users.entity';
import { User } from '../common/decorators/user.decorator';
import dotenv from 'dotenv';
dotenv.config({ path: '.development.env' });

const publicURL = process.env.PUBLIC_URL || 'http://localhost';

@Controller('auth')
export class AuthController {
  @Get()
  authOptions(): string {
    return `
    <ul>
      <li><a href="/auth/google">Google</a></li>
      <li><a href="/auth/github">Github</a></li>
    </ul>`;
  }

  @Get('google')
  @UseGuards(GoogleGuard)
  googleLogin(): void {
    // ...
  }

  @Get('google/callback')
  @UseGuards(GoogleGuard)
  googleCallback(@User() user: UserEntity): UserEntity | undefined {
    return user;
  }

  @Get('github')
  @UseGuards(GithubGuard)
  githubLogin(): void {
    // ...
  }

  // @Get('github/callback')
  // @UseGuards(GithubGuard)
  // githubCallback(@User() user: UserEntity): UserEntity | undefined {
  //   return user;
  // }

  @Get('github/callback')
  @UseGuards(GithubGuard)
  githubCallback(@Res() res: Response): void {
    return res.redirect(publicURL); // import from dotenv
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    req.session!.destroy((): void => undefined);
    req.logout();
    res.clearCookie('nest');
    return res.redirect(publicURL);
  }
}
