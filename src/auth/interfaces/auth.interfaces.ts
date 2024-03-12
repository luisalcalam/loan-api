import { User } from '../../users/entities/user.entity';

export class LoginResponse {
  user: User;
  session: SessionInterface;
}

export interface SessionInterface {
  accessToken: TokenInterface;
  refreshToken: TokenInterface;
}

export interface TokenInterface {
  token: string;
  expiresIn: string;
  createdAt: string;
}
