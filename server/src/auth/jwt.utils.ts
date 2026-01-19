import * as jwt from 'jsonwebtoken';
import { UserRole } from './dto/login.dto';

export interface CustomJwtPayload {
  sub: number;
  email: string;
  name: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

export function generateTokens(user: {
  id: number;
  email: string;
  name: string;
  role: UserRole;
}): { accessToken: string; refreshToken: string } {
  const payload: CustomJwtPayload = {
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };

  const accessToken = jwt.sign(
    payload,
    process.env.JWT_ACCESS_SECRET || 'access_secret',
    {
      expiresIn: '15m',
    },
  );

  const refreshToken = jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET || 'refresh_secret',
    {
      expiresIn: '7d',
    },
  );

  return { accessToken, refreshToken };
}

export function verifyAccessToken(token: string): CustomJwtPayload {
  try {
    return jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET || 'access_secret',
    ) as unknown as CustomJwtPayload; // ✅ ИСПРАВЛЕНО
  } catch {
    throw new Error('Invalid access token');
  }
}

export function verifyRefreshToken(token: string): CustomJwtPayload {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET || 'refresh_secret',
    ) as unknown as CustomJwtPayload; // ✅ ИСПРАВЛЕНО
    if (!decoded.sub || !decoded.email || !decoded.name || !decoded.role) {
      throw new Error('Invalid payload');
    }
    return decoded;
  } catch {
    throw new Error('Invalid refresh token');
  }
}
