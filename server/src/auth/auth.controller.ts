// ✅ Эндпоинты: POST /api/auth/register, /login, /register-trainer, /refresh, DELETE /logout
import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  Delete,
  HttpCode,
  UsePipes,
  ValidationPipe,
  UnauthorizedException,
} from '@nestjs/common';
import type { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterTrainerDto } from '../trainer/dto/register-trainer.dto';

@Controller('auth') // ✅ /api/auth/*
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register') // ✅ POST /api/auth/register (USER)
  @UsePipes(new ValidationPipe())
  async register(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken, user } =
      await this.authService.register(dto);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'strict',
    });
    return { user, accessToken };
  }

  @Post('register-trainer') // ✅ POST /api/auth/register-trainer (TRAINER + ФОТО)
  @UsePipes(new ValidationPipe())
  async registerTrainer(
    @Body() dto: RegisterTrainerDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken, trainer } =
      await this.authService.registerTrainer(dto);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'strict',
    });
    return { trainer, accessToken };
  }

  @Post('login') // ✅ POST /api/auth/login (USER + TRAINER)
  @UsePipes(new ValidationPipe())
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken, user } =
      await this.authService.login(dto);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'strict',
    });
    return { user, accessToken };
  }

  @Post('refresh') // ✅ POST /api/auth/refresh
  @HttpCode(200)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken) throw new UnauthorizedException('No refresh token');
    const {
      accessToken,
      refreshToken: newRefreshToken,
      user,
    } = await this.authService.refresh(refreshToken);
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'strict',
    });
    return { user, accessToken };
  }

  @Delete('logout') // ✅ DELETE /api/auth/logout
  @HttpCode(204)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('refreshToken');
  }
}
